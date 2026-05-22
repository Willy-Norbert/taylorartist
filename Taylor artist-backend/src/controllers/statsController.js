import Listener from "../models/Listener.js";
import Song from "../models/Song.js";

// Track a play (prevent duplicates via session)
export const trackPlay = async (req, res) => {
    try {
        const { songId } = req.body;
        const sessionId = req.headers['x-session-id'] || req.ip + req.headers['user-agent'];
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];

        if (!songId) {
            return res.status(400).json({ message: "Song ID required" });
        }

        // Check if this session has already listened to this song
        const existingPlay = await Listener.findOne({ songId, sessionId });

        if (existingPlay) {
            // Update last listened time but don't count as new play
            existingPlay.listenedAt = new Date();
            await existingPlay.save();
            return res.json({ 
                message: "Play updated", 
                isNewPlay: false,
                totalPlays: await Listener.countDocuments({ songId })
            });
        }

        // Create new listener record
        const newListener = new Listener({
            songId,
            ipAddress,
            sessionId,
            userAgent,
            listenedAt: new Date()
        });

        await newListener.save();

        // Get updated play count
        const totalPlays = await Listener.countDocuments({ songId });

        res.json({ 
            message: "Play tracked", 
            isNewPlay: true,
            totalPlays 
        });

    } catch (error) {
        console.log('Error tracking play:', error);
        res.status(500).json({ message: "Error tracking play" });
    }
};

// Get stats for a specific song
export const getSongStats = async (req, res) => {
    try {
        const { songId } = req.params;
        
        // Total plays (unique listeners)
        const totalPlays = await Listener.countDocuments({ songId });
        
        // Monthly listeners for this song (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const monthlyListeners = await Listener.countDocuments({ 
            songId, 
            listenedAt: { $gte: thirtyDaysAgo }
        });

        // Unique monthly listeners (by IP)
        const uniqueMonthlyListeners = await Listener.distinct('ipAddress', {
            songId,
            listenedAt: { $gte: thirtyDaysAgo }
        });

        res.json({
            totalPlays,
            monthlyListeners,
            uniqueMonthlyListeners: uniqueMonthlyListeners.length,
            lastUpdated: new Date()
        });

    } catch (error) {
        console.log('Error getting song stats:', error);
        res.status(500).json({ message: "Error getting stats" });
    }
};

// Get overall artist stats
export const getArtistStats = async (req, res) => {
    try {
        // Get all songs
        const songs = await Song.find({});
        const songIds = songs.map(s => s._id);

        // Total unique listeners across all songs
        const totalPlays = await Listener.countDocuments({});
        
        // Monthly listeners (last 30 days)
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const monthlyListeners = await Listener.countDocuments({
            listenedAt: { $gte: thirtyDaysAgo }
        });

        // Unique monthly listeners (distinct IPs in last 30 days)
        const uniqueMonthlyListeners = await Listener.distinct('ipAddress', {
            listenedAt: { $gte: thirtyDaysAgo }
        });

        // Top songs by plays
        const topSongs = await Listener.aggregate([
            { $group: { _id: "$songId", playCount: { $sum: 1 } } },
            { $sort: { playCount: -1 } },
            { $limit: 10 },
            { $lookup: { from: "songs", localField: "_id", foreignField: "_id", as: "song" } },
            { $unwind: "$song" }
        ]);

        res.json({
            totalPlays,
            monthlyListeners,
            uniqueMonthlyListeners: uniqueMonthlyListeners.length,
            topSongs: topSongs.map(s => ({
                name: s.song.name,
                image: s.song.image,
                playCount: s.playCount
            })),
            lastUpdated: new Date()
        });

    } catch (error) {
        console.log('Error getting artist stats:', error);
        res.status(500).json({ message: "Error getting artist stats" });
    }
};

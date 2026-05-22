import mongoose from "mongoose";

const listenerSchema = new mongoose.Schema({
    songId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song',
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    listenedAt: {
        type: Date,
        default: Date.now
    },
    listenDuration: {
        type: Number,
        default: 0
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

// Compound index to prevent duplicate plays from same session
listenerSchema.index({ songId: 1, sessionId: 1 }, { unique: true });

const Listener = mongoose.models.listener || mongoose.model("listener", listenerSchema);

export default Listener;

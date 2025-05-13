const Subscriber = require('../models/subscriber.model');

// Subscribe a new user
exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(201).json({ message: 'Subscription successful', subscriber: newSubscriber });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Unsubscribe a user
exports.unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const subscriber = await Subscriber.findOneAndDelete({ email });
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        res.status(200).json({ message: 'Unsubscription successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all subscribers
exports.getAllSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
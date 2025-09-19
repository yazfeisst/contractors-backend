
const { response } = require('express')


const Entry = require('../models/entryModel')


const mongoose = require('mongoose')


const getEntries = async (req, res) => {
    try {
        const entries = await Entry.find({}).sort({ createdAt: -1 });
        res.status(200).json(entries)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}


const getEntry = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Entry: Invalid Id' });
    }

    try {
        const entry = await Listing.findById(id);

        if (!entry) {
            return res.status(404).json({ error: 'No such Entry, Entry does not exist' });
        }

        res.status(200).json(entry);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const createEntry = async (req, res) => {
    const { 
        company_name,
        contractor_name,
        date,
        time_in,
        time_out,
        work,
        manager,
        initials,
        comments
    } = req.body;

    try {
        const entry = await Entry.create({
            company_name,
            contractor_name,
            date,
            time_in,
            time_out,
            work,
            manager,
            initials,
            comments
        })
        res.status(200).json(entry)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const updateEntry = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such entry'})
    }

    const entry = await Entry.findByIdAndUpdate(
        {_id: id},
        {...req.body},
        {new: true}
    );

    if(!entry) {
        return res.status(404).json({error: 'No such entry'});
    }

    res.status(200).json(entry)
}

const deleteEntry = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such entry'})
    }

    const entry = await Entry.findByIdAndDelete({_id: id})

    if(!entry) {
        return res.status(404).json({error: 'No such entry'});
    }

    res.status(200).json(entry)
}

module.exports = {
    getEntries,
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry
}
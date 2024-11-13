const language = require("../model/languageModel");
const { v4: uuidv4 } = require('uuid');

const createLanguage = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(404).json({
                success: false,
                message: "language name is required!"
            })
        }

        const languageExists = await language.findOne({ name: new RegExp(`^${name}$`, 'i') });

        if (languageExists) {
            return res.status(400).json({
                message: "Language Already exists",
                success: false
            })
        }

        const createLanguage = new language({ name, id: uuidv4() })
        await createLanguage.save();

        res.status(200).json({
            success: true,
            message: "Language is created Successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Error in create language",
            success: false,
            error: error.message || error
        })
    }
}

const allLanguage = async (req, res) => {
    try {
        const languages = await language.find();
        res.status(200).json({
            data: languages,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in get languages",
            success: false,
            error: error.message || error
        })
    }
}

module.exports = {
    createLanguage,
    allLanguage
}
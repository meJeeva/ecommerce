const Banner = require('../model/bannerModel')

const createBanner = async (req, res) => {
    try {
        const { image, type } = req.body;

        if (!image) {
            return res.status(500).json({
                success: false,
                message: "image is required"
            });
        }

        if (!type) {
            return res.status(500).json({
                success: false,
                message: "type is required"
            });
        }

        const newBanner = new Banner({
            image,
            type
        });

        await newBanner.save();
        res.status(201).json({
            success: true,
            message: "Banner added successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "error in adding banner",
            error: error.message || error
        });
    }
};

const allBanner = async (req, res) => {
    try {
        const { type } = req.params;

        if (!type) {
            return res.status(400).json({
                success: false,
                message: "Type is required in query parameters"
            });
        }

        const banner = await Banner.find({ type });

        res.status(200).json({
            success: true,
            data: banner
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getting banner",
            error: error.message || error
        });
    }
};


module.exports = {
    createBanner,
    allBanner
}
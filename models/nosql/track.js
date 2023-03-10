const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TrackSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: (req) => {
                    return true;
                },
                message: "ERROR_URL"
            },
        },
        artist: {
            name: {
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number,
            },
            end: {
                type: Number,
            },
        },
        mediaId: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


TrackSchema.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            $unwind: "$audio"
        }
    ])

    return joinData
};

TrackSchema.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "storages",
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
        },
        {
            $unwind: "$audio"
        },
        
    ])

    return joinData
};

TrackSchema.plugin(mongooseDelete, { overrideMethods: "all" })
module.exports = mongoose.model("tracks", TrackSchema)
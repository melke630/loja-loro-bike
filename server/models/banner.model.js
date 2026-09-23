
// dezendo a ia que vai da tudo certo
/*
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""    
    },
    
    redirectTo: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const BannerModel = mongoose.models.banner || mongoose.model('banner', bannerSchema);

export default BannerModel; */
import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""    
    },
    imageDesktop: {
        type: String,
        default: ""
    },
    imageMobile: {
        type: String,
        default: ""
    },
    redirectTo: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

const BannerModel = mongoose.models.banner || mongoose.model('banner', bannerSchema);

export default BannerModel;
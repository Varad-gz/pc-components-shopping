const { rimraf } = require("rimraf");
const { insertPendingDeletion } = require("../models/pending.prodImage.deletions.model");

module.exports = {
    deleteFolderorInsertDb: async (path) => {
        try {
            await rimraf(path); //delete folder recursively
            console.log('folder deleted')
        } catch (deleteError) {
            console.error(deleteError);
            try {
                await insertPendingDeletion(path);
                console.log('folder inserted')
            } catch (insertError) {
                console.error(insertError);
            }
        }
    }
}
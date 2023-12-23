const { pquery, pbeginTransaction, pcommit } = require("../utils/promisified");

module.exports = {
    insertPendingDeletion : async (path) => {
        const sql_query = `insert into pending_image_deletions (pending_paths) values (?);`;
        const sql_values = [path];
        try {
            return await pquery(sql_query, sql_values);
        } catch (err) {
            console.log(err);
        }
    },
}
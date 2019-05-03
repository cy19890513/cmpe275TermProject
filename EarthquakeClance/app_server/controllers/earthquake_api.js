module.exports.get_num_earthquake_per_country = function (req, res) {
    const db = req.db;
    const collection = db.get("earthquake");
    const search = getSearchObj(req.query);
    collection
        .aggregate([{ $match: search }, { $group: { _id: "$country", total: { $sum: 1 } } }])
        .then(doc => {
            res.json(doc);
            // res.json(req.query);
        })
        .catch(err => {
            res.send(err);
        });
};

function getSearchObj(vals) {
    const search = vals.country == null ? {} : { country: vals.country };
    if (vals.begin != null || vals.end != null) {
        search.year = {};
    }
    if (vals.begin != null) {
        search.year.$gte = parseInt(vals.begin);
    }
    if (vals.end != null) {
        search.year.$lte = parseInt(vals.end);
    }
    return search;
}

//winson
module.exports.get_num_earthquake_per_year = function (req, res) {
    var db = req.db;
    var collection = db.get("earthquake");
    const search = getSearchObj(req.query);
    collection
        .aggregate([
            { $match: search },
            { $group: { _id: "$year", total: { $sum: 1 } } },
            { $sort: { _id: -1 } },
            { $limit: 101 },
            { $sort: { _id: 1 } }
        ])
        .then(doc => {
            res.json(doc);
        });
};

//matt
module.exports.get_earthquake_with_top_losses = function (req, res) {
    var db = req.db;
    var collection = db.get("earthquake");
    const search = getSearchObj(req.query);
    search.total_damage_millions_dollars = { $gt: 0 };
    //find({damage_millions_dollars:{$gt:0}}).sort({damage_millions_dollars:-1}).limit(10).forEach(printjson)
    collection
        // .find(
        //   {
        //     country: search.country,
        //     year: search.year,
        //     damage_millions_dollars: { $gt: 0 }
        //   },
        //   { sort: { damage_millions_dollars: -1 }, limit: 10 }
        // )
        .aggregate([
            { $match: search },
            { $sort: { total_damage_millions_dollars: -1 } },
            { $limit: 10 }
        ])
        .then(doc => {
            res.json(doc);
        });
};

//will
module.exports.get_earthquakes_with_top_deaths = function (req, res) {
    var db = req.db;
    var collection = db.get("earthquake");
    const search = getSearchObj(req.query);
    search.total_deaths = { $gt: 0 };
    collection
        // .find(
        //   {
        //     search,
        //     total_deaths: { $gt: 0 },
        //     // total_missing: { $gt: 0 }
        //   },
        //   {
        //     // fields: { deaths: 1, total_deaths: 1, missing: 1, total_missing: 1, injuries: 1, total_injuries: 1 },
        //     sort: { total_deaths: -1 }, limit: 10
        //   }
        // )
        .aggregate([
            { $match: search },
            { $sort: { total_deaths: -1 } },
            { $limit: 10 }
        ])
        .then(doc => {
            res.json(doc);
        });
};

module.exports.get_statistics = function (req, res) {
    const db = req.db;
    const collection = db.get("earthquake");
    const search = getSearchObj(req.query);
    collection
        .aggregate([
            { $match: search },
            {
                $group: {
                    _id: 'statistics',
                    death_total: { $sum: "$total_deaths" },
                    loss_total: { $sum: "$damage_millions_dollars" }
                }
            }
        ])
        .then(doc => {
            res.json(doc[0]);
        })
        .catch(err => {
            res.send(err);
        });
}

// earthquakes_level_pie_chart
module.exports.get_earthquake_level = function (req, res) {
    var db = req.db;
    var collection = db.get("earthquake");
    collection
        .find(
            {
                total_deaths: { $gt: 0 },
                // total_missing: { $gt: 0 }
            },
            {
                // fields: { deaths: 1, total_deaths: 1, missing: 1, total_missing: 1, injuries: 1, total_injuries: 1 },
                sort: { total_deaths: -1 }, limit: 10
            }
        )
        .then(doc => {
            res.json(doc);
        });
};

module.exports.all_countries = function (req, res) {
    const db = req.db;
    const collection = db.get("earthquake");
    collection
        .aggregate([{ $group: { _id: "$country" } }])
        .then(doc => {
            res.json(doc);
        });
}

module.exports.get_first_date = function (req, res) {
    const db = req.db;
    const collection = db.get("earthquake");
    collection
        .find({}, { limit: 1, sort: { year: 1 } })
        .then(doc => {
            res.json({ year: doc[0].year });
        });
}

module.exports.get_last_date = function (req, res) {
    const db = req.db;
    const collection = db.get("earthquake");
    collection
        .find({}, { limit: 1, sort: { year: -1 } })
        .then(doc => {
            res.json({ year: doc[0].year });
        });
}



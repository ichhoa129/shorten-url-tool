const shortid = require("shortid");
const UrlModel = require("../model/url.model");

const saveUrl = async (req, res) => {
  try {
    let { url: rootUrl } = req.body;
    let foundUrl = await UrlModel.findOne({ url: rootUrl });
    if (foundUrl) {
      return res.json({
        slug: foundUrl._id,
      });
    }
    let newId;
    do {
      newId = shortid().slice(0, 5);
      let isIdExisted = await UrlModel.findOne({ _id: newId });
      if (!isIdExisted) break;
    } while (1);

    await UrlModel.create({ _id: newId, url: rootUrl, isActive: true });
    return res.json({
      success: true,
      slug: newId,
    });
  } catch (error) {
    console.log("error: " + error);
  }
};

const getUrl = async (req, res) => {
  console.log('getUrl');
  let id = req.params.id;
  let foundUrl = await UrlModel.findOne({ _id: id });
  if (foundUrl) 
  {
    console.log('found and : '+foundUrl.url);
    res.redirect(foundUrl.url);
    res.end();
  }
  else {
    console.log('not found');
    res.render("error");
    res.end();
  } 
};

module.exports = {
  getUrl,
  saveUrl,
};

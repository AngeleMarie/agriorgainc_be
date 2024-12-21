import News from '../models/newsModel.js';

// Get all news items
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};


const createNews = async (req, res) => {
  try {
    const { headline, description, category, date, picture } = req.body;
    const newsItem = new News({ headline,description, category, date, picture });
    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news item' });
  }
};

// Update a news item
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNews = await News.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news item' });
  }
};

// Delete a news item
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndDelete(id);
    res.status(200).json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news item' });
  }
};

export default {createNews,getAllNews,deleteNews,updateNews}
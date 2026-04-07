import Content from '../models/Content.js';

export const getAllContent = async (req, res) => {
  try {
    const { type, genre, search, page = 1, limit = 20 } = req.query;

    const filter = { 'availability.isAvailable': true };

    if (type) filter.type = type;
    if (genre) filter.genres = genre;
    if (search) {
      filter.$text = { $search: search };
    }

    const content = await Content.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Content.countDocuments(filter);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContentById = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('comments');

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrending = async (req, res) => {
  try {
    const trending = await Content.find({ isTrending: true })
      .limit(20)
      .sort({ views: -1 });

    res.status(200).json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeatured = async (req, res) => {
  try {
    const featured = await Content.find({ isFeatured: true }).limit(10);
    res.status(200).json(featured);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const user = req.user;

    let query = { 'availability.isAvailable': true };

    // If user has preferred genres, filter by them
    if (user && user.preferences && user.preferences.favoriteGenres?.length > 0) {
      query.genres = { $in: user.preferences.favoriteGenres };
    }

    const recommendations = await Content.find(query)
      .sort({ rating: -1, views: -1 })
      .limit(20)

    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContent = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      genres,
      director,
      cast,
      duration,
      releaseDate,
      contentRating,
      language,
      subtitles,
      posterImage,
      coverImage,
      bannerImage,
      availability,
      videoQualities,
    } = req.body;

    const content = new Content({
      title,
      description,
      type,
      genres,
      director,
      cast,
      duration,
      releaseDate,
      contentRating,
      language,
      subtitles,
      posterImage,
      coverImage,
      bannerImage,
      availability,
      videoQualities,
    });

    await content.save();

    res.status(201).json({
      message: 'Content created successfully',
      content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const content = await Content.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({
      message: 'Content updated successfully',
      content,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const { id } = req.params;
    const content = await Content.findByIdAndDelete(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const existingRating = content.userRatings.find(
      (r) => r.userId.toString() === req.user.id
    );

    if (existingRating) {
      existingRating.rating = rating;
    } else {
      content.userRatings.push({
        userId: req.user.id,
        rating,
      });
    }

    // Calculate average rating
    const totalRating = content.userRatings.reduce((sum, r) => sum + r.rating, 0);
    content.rating = totalRating / content.userRatings.length;

    await content.save();

    res.status(200).json({
      message: 'Rating submitted',
      rating: content.rating,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

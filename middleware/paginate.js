export const paginate = (model, options) => {
  return async (req, res, next) => {
    console.log("Entered paginate function");
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;

      // Get total count for pagination calculations
      const totalItems = await model.countDocuments();
      const totalPages = Math.ceil(totalItems / limit);

      let query = model
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const results = await query;

      // Calculate pagination metadata
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;

      // Attach pagination data to res.locals for use in controller
      res.locals.paginatedResults = {
        success: true,
        count: results.length,
        data: results,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
          hasNextPage: hasNextPage,
          hasPrevPage: hasPrevPage,
          nextPage: hasNextPage ? page + 1 : null,
          prevPage: hasPrevPage ? page - 1 : null,
          limit: limit,
        },
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
import mongoose from 'mongoose';

import { Schema, SchemaTypes, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  }, 
});

const Post = model('Post', postSchema);

export default Post;

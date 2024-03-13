import React from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  is_private: boolean;
  isAdmin: boolean;
  following_count: number;
  followers_count: number;
  saved_count: number;
  saved_quizes: Saved[];
  bio?: string;
  image_url?: string;
  quizes?: Quiz[];
  following?: Follower[];
}

export interface Follower {
  id: string;
  user?: User;
  user_id: string;
  author_id: string;
}

export interface Saved {
  id: string;
  user_id: string;
  quiz_id: string;
  quiz: Quiz;
  user?: User;
}

export interface Question {
  id: string;
  title: string;
  options: string;
  answer: string;
  exams: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  likes_count: number;
  plays_count: number;
  thumbnail: string;
  author?: Partial<User>;
  user_id: string;
  questionCount: number;
  questions: Question[];
}

export interface Nav {
  title: string;
  icon: React.ReactNode;
  active: boolean;
  href: string;
  highlight?: boolean;
}

export interface Author {
  id?: string;
  name: string;
  email?: string;
  imageUrl?: string;
  quizes?: Quiz[];
}

export interface History {
  id: string;
  points: number;
  quiz_id: string;
  user_id: string;
  quiz: Quiz;
}

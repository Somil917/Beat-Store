import Stripe from "stripe";

export interface UserDetails {
  id: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  full_name?: string;
  discography?: string;
  biography?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Beat {
  id: string;
  title: string;
  author: string;
  user_id: string;
  beat_path: string;
  image_path: string;
  key: string;
  bpm: number;
  created_at: string;
  tags: string[];
  genres: string[];
}

export interface Draft {
  id: string;
  user_id: string;
  metadata: any;
  created_at: string;
  cover_art_url: string;
  audio_file_url: string;
  is_published: boolean;
  is_saved: boolean;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

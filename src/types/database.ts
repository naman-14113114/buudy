export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          shipping_line1: string | null;
          shipping_line2: string | null;
          shipping_city: string | null;
          shipping_state: string | null;
          shipping_postal_code: string | null;
          shipping_country: string | null;
          marketing_opt_in: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          shipping_line1?: string | null;
          shipping_line2?: string | null;
          shipping_city?: string | null;
          shipping_state?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          marketing_opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          shipping_line1?: string | null;
          shipping_line2?: string | null;
          shipping_city?: string | null;
          shipping_state?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          marketing_opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          user_id: string | null;
          customer_email: string;
          customer_full_name: string;
          customer_phone: string | null;
          shipping_line1: string | null;
          shipping_line2: string | null;
          shipping_city: string | null;
          shipping_state: string | null;
          shipping_postal_code: string | null;
          shipping_country: string | null;
          status: string;
          source: string;
          subtotal_cents: number;
          shipping_cents: number;
          total_cents: number;
          savings_cents: number;
          gift_value_cents: number;
          currency: string;
          promo_codes: string[];
          gift_message: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          user_id?: string | null;
          customer_email: string;
          customer_full_name: string;
          customer_phone?: string | null;
          shipping_line1?: string | null;
          shipping_line2?: string | null;
          shipping_city?: string | null;
          shipping_state?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          status?: string;
          source?: string;
          subtotal_cents: number;
          shipping_cents?: number;
          total_cents: number;
          savings_cents?: number;
          gift_value_cents?: number;
          currency?: string;
          promo_codes?: string[];
          gift_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          order_number?: string;
          user_id?: string | null;
          customer_email?: string;
          customer_full_name?: string;
          customer_phone?: string | null;
          shipping_line1?: string | null;
          shipping_line2?: string | null;
          shipping_city?: string | null;
          shipping_state?: string | null;
          shipping_postal_code?: string | null;
          shipping_country?: string | null;
          status?: string;
          source?: string;
          subtotal_cents?: number;
          shipping_cents?: number;
          total_cents?: number;
          savings_cents?: number;
          gift_value_cents?: number;
          currency?: string;
          promo_codes?: string[];
          gift_message?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          product_slug: string | null;
          line_type: "product" | "gift";
          title: string;
          subtitle: string | null;
          image: string | null;
          quantity: number;
          unit_price_cents: number;
          compare_at_cents: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          product_slug?: string | null;
          line_type: "product" | "gift";
          title: string;
          subtitle?: string | null;
          image?: string | null;
          quantity: number;
          unit_price_cents: number;
          compare_at_cents?: number | null;
          created_at?: string;
        };
        Update: {
          order_id?: string;
          product_id?: string;
          product_slug?: string | null;
          line_type?: "product" | "gift";
          title?: string;
          subtitle?: string | null;
          image?: string | null;
          quantity?: number;
          unit_price_cents?: number;
          compare_at_cents?: number | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey";
            columns: ["order_id"];
            isOneToOne: false;
            referencedRelation: "orders";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Order = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItem = Database["public"]["Tables"]["order_items"]["Row"];

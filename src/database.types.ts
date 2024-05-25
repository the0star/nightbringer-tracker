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
      cards: {
        Row: {
          attribute: string;
          characters: string[];
          id: number;
          name: string;
          rarity: string;
          source: string[] | null;
          type: string;
        };
        Insert: {
          attribute: string;
          characters: string[];
          id?: number;
          name: string;
          rarity: string;
          source?: string[] | null;
          type: string;
        };
        Update: {
          attribute?: string;
          characters?: string[];
          id?: number;
          name?: string;
          rarity?: string;
          source?: string[] | null;
          type?: string;
        };
        Relationships: [];
      };
      dt_rewards: {
        Row: {
          amount: number | null;
          card_name: string;
          cost: number;
          id: number;
          name: string | null;
          type: Database["public"]["Enums"]["dt_reward_types"];
        };
        Insert: {
          amount?: number | null;
          card_name: string;
          cost: number;
          id?: number;
          name?: string | null;
          type: Database["public"]["Enums"]["dt_reward_types"];
        };
        Update: {
          amount?: number | null;
          card_name?: string;
          cost?: number;
          id?: number;
          name?: string | null;
          type?: Database["public"]["Enums"]["dt_reward_types"];
        };
        Relationships: [
          {
            foreignKeyName: "dt_rewards_card_name_fkey";
            columns: ["card_name"];
            isOneToOne: false;
            referencedRelation: "cards";
            referencedColumns: ["name"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      revisions: {
        Row: {
          content: Json;
          created_at: string;
          id: number;
          page: string | null;
          user: string;
        };
        Insert: {
          content: Json;
          created_at?: string;
          id?: number;
          page?: string | null;
          user: string;
        };
        Update: {
          content?: Json;
          created_at?: string;
          id?: number;
          page?: string | null;
          user?: string;
        };
        Relationships: [
          {
            foreignKeyName: "revisions_page_fkey";
            columns: ["page"];
            isOneToOne: false;
            referencedRelation: "cards";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "revisions_user_fkey";
            columns: ["user"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_cards: {
        Row: {
          card_name: string;
          id: number;
          user_id: string;
        };
        Insert: {
          card_name: string;
          id?: number;
          user_id: string;
        };
        Update: {
          card_name?: string;
          id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_cards_card_name_fkey";
            columns: ["card_name"];
            isOneToOne: false;
            referencedRelation: "cards";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "user_cards_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      dt_reward_types:
        | "icon"
        | "bgm"
        | "chat"
        | "home picture"
        | "voice"
        | "wallpaper"
        | "item"
        | "clothing"
        | "skill animation"
        | "moving picture";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

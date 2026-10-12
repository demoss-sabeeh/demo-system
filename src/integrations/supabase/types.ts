export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

type AddBusinessId<T> = T extends {
  Row: infer Row;
  Insert: infer Insert;
  Update: infer Update;
}
  ? "business_id" extends keyof Row
    ? T
    : Omit<T, "Row" | "Insert" | "Update"> & {
        Row: Row & { business_id: string | null };
        Insert: Insert & { business_id?: string | null };
        Update: Update & { business_id?: string | null };
      }
  : T;

type AddBusinessIds<T> = {
  [K in keyof T]: K extends "businesses" ? T[K] : AddBusinessId<T[K]>
};

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: AddBusinessIds<{
      appointments: {
        Row: {
          created_at: string
          customer_id: string
          duration_hours: number
          id: string
          lead_id: string | null
          location: string
          notes: string
          service_id: string | null
          starts_at: string
          status: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          duration_hours?: number
          id?: string
          lead_id?: string | null
          location?: string
          notes?: string
          service_id?: string | null
          starts_at: string
          status?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          duration_hours?: number
          id?: string
          lead_id?: string | null
          location?: string
          notes?: string
          service_id?: string | null
          starts_at?: string
          status?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "appointments_business_lead_fkey"
            columns: ["business_id", "lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "appointments_business_service_fkey"
            columns: ["business_id", "service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "appointments_business_vehicle_fkey"
            columns: ["business_id", "vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      automation_runs: {
        Row: {
          automation_id: string
          created_at: string
          customer_id: string | null
          id: string
          lead_id: string | null
          status: string
          summary: string
        }
        Insert: {
          automation_id: string
          created_at?: string
          customer_id?: string | null
          id?: string
          lead_id?: string | null
          status?: string
          summary?: string
        }
        Update: {
          automation_id?: string
          created_at?: string
          customer_id?: string | null
          id?: string
          lead_id?: string | null
          status?: string
          summary?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_runs_business_automation_fkey"
            columns: ["business_id", "automation_id"]
            isOneToOne: false
            referencedRelation: "automations"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "automation_runs_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "automation_runs_business_lead_fkey"
            columns: ["business_id", "lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      automations: {
        Row: {
          actions: string[]
          conditions: string[]
          delay: string | null
          description: string
          id: string
          key: string
          name: string
          sort: number
          status: string
          trigger: string
        }
        Insert: {
          actions?: string[]
          conditions?: string[]
          delay?: string | null
          description?: string
          id?: string
          key: string
          name: string
          sort?: number
          status?: string
          trigger: string
        }
        Update: {
          actions?: string[]
          conditions?: string[]
          delay?: string | null
          description?: string
          id?: string
          key?: string
          name?: string
          sort?: number
          status?: string
          trigger?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          created_at: string
          id: string
          name: string
          public_catalog: boolean
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          public_catalog?: boolean
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          public_catalog?: boolean
        }
        Relationships: []
      }
      business_members: {
        Row: {
          business_id: string
          created_at: string
          role: string
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string
          role?: string
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      customers: {
        Row: {
          city: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          notes: string
          phone: string
        }
        Insert: {
          city?: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          notes?: string
          phone?: string
        }
        Update: {
          city?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          notes?: string
          phone?: string
        }
        Relationships: []
      }
      follow_ups: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          last_contact_at: string | null
          lead_id: string | null
          next_contact_at: string | null
          reason: string
          status: string
          type: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          last_contact_at?: string | null
          lead_id?: string | null
          next_contact_at?: string | null
          reason?: string
          status?: string
          type: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          last_contact_at?: string | null
          lead_id?: string | null
          next_contact_at?: string | null
          reason?: string
          status?: string
          type?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "follow_ups_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "follow_ups_business_lead_fkey"
            columns: ["business_id", "lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "follow_ups_business_vehicle_fkey"
            columns: ["business_id", "vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      lead_activities: {
        Row: {
          created_at: string
          customer_id: string | null
          detail: string
          id: string
          lead_id: string | null
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          customer_id?: string | null
          detail?: string
          id?: string
          lead_id?: string | null
          title: string
          type: string
        }
        Update: {
          created_at?: string
          customer_id?: string | null
          detail?: string
          id?: string
          lead_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lead_activities_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "lead_activities_business_lead_fkey"
            columns: ["business_id", "lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          customer_id: string
          estimated_value: number
          id: string
          notes: string
          preferred_date: string | null
          preferred_time: string | null
          service_id: string | null
          source: string
          status: string
          updated_at: string
          vehicle_condition: string | null
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          estimated_value?: number
          id?: string
          notes?: string
          preferred_date?: string | null
          preferred_time?: string | null
          service_id?: string | null
          source?: string
          status?: string
          updated_at?: string
          vehicle_condition?: string | null
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          estimated_value?: number
          id?: string
          notes?: string
          preferred_date?: string | null
          preferred_time?: string | null
          service_id?: string | null
          source?: string
          status?: string
          updated_at?: string
          vehicle_condition?: string | null
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "leads_business_service_fkey"
            columns: ["business_id", "service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "leads_business_vehicle_fkey"
            columns: ["business_id", "vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      messages: {
        Row: {
          automated: boolean
          body: string
          channel: string
          created_at: string
          customer_id: string
          direction: string
          id: string
          lead_id: string | null
        }
        Insert: {
          automated?: boolean
          body: string
          channel?: string
          created_at?: string
          customer_id: string
          direction: string
          id?: string
          lead_id?: string | null
        }
        Update: {
          automated?: boolean
          body?: string
          channel?: string
          created_at?: string
          customer_id?: string
          direction?: string
          id?: string
          lead_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "messages_business_lead_fkey"
            columns: ["business_id", "lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          created_at: string
          id: string
          read: boolean
          title: string
        }
        Insert: {
          body?: string
          created_at?: string
          id?: string
          read?: boolean
          title: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          read?: boolean
          title?: string
        }
        Relationships: []
      }
      quote_items: {
        Row: {
          description: string
          id: string
          quantity: number
          quote_id: string
          sort: number
          unit_price: number
        }
        Insert: {
          description: string
          id?: string
          quantity?: number
          quote_id: string
          sort?: number
          unit_price?: number
        }
        Update: {
          description?: string
          id?: string
          quantity?: number
          quote_id?: string
          sort?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_items_business_quote_fkey"
            columns: ["business_id", "quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      quotes: {
        Row: {
          created_at: string
          customer_id: string
          discount: number
          expires_at: string | null
          id: string
          lead_id: string | null
          notes: string
          number: string
          service_id: string | null
          status: string
          vehicle_id: string | null
        }
        Insert: {
          created_at?: string
          customer_id: string
          discount?: number
          expires_at?: string | null
          id?: string
          lead_id?: string | null
          notes?: string
          number: string
          service_id?: string | null
          status?: string
          vehicle_id?: string | null
        }
        Update: {
          created_at?: string
          customer_id?: string
          discount?: number
          expires_at?: string | null
          id?: string
          lead_id?: string | null
          notes?: string
          number?: string
          service_id?: string | null
          status?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "quotes_business_lead_fkey"
            columns: ["business_id", "lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "quotes_business_service_fkey"
            columns: ["business_id", "service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["business_id", "id"]
          },
          {
            foreignKeyName: "quotes_business_vehicle_fkey"
            columns: ["business_id", "vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
      services: {
        Row: {
          active: boolean
          created_at: string
          description: string
          duration_hours: number
          id: string
          ideal_customer: string
          includes: string[]
          name: string
          price_from: number
          price_to: number | null
          short_description: string
          slug: string
          sort: number
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string
          duration_hours?: number
          id?: string
          ideal_customer?: string
          includes?: string[]
          name: string
          price_from?: number
          price_to?: number | null
          short_description?: string
          slug: string
          sort?: number
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string
          duration_hours?: number
          id?: string
          ideal_customer?: string
          includes?: string[]
          name?: string
          price_from?: number
          price_to?: number | null
          short_description?: string
          slug?: string
          sort?: number
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          color: string
          created_at: string
          customer_id: string
          id: string
          make: string
          model: string
          notes: string
          year: number
        }
        Insert: {
          color?: string
          created_at?: string
          customer_id: string
          id?: string
          make: string
          model: string
          notes?: string
          year: number
        }
        Update: {
          color?: string
          created_at?: string
          customer_id?: string
          id?: string
          make?: string
          model?: string
          notes?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_business_customer_fkey"
            columns: ["business_id", "customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["business_id", "id"]
          },
        ]
      }
    }>
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_business_id: { Args: never; Returns: string }
      delete_customer: { Args: { _id: string }; Returns: undefined }
      delete_lead: { Args: { _id: string }; Returns: undefined }
      delete_service: { Args: { _id: string }; Returns: undefined }
      delete_vehicle: { Args: { _id: string }; Returns: undefined }
      is_business_member: { Args: { _business_id: string }; Returns: boolean }
      is_business_public: { Args: { _business_id: string }; Returns: boolean }
      seed_demo: { Args: never; Returns: undefined }
      submit_public_booking_request: {
        Args: {
          p_business_id: string
          p_contact: Json
          p_date: string
          p_notes?: string
          p_service_slug: string
          p_starts_at: string
          p_time: string
          p_vehicle: Json
        }
        Returns: Json
      }
      submit_public_quote_request: {
        Args: {
          p_business_id: string
          p_condition?: string
          p_contact: Json
          p_notes?: string
          p_preferred_date?: string | null
          p_preferred_time?: string | null
          p_service_slug: string
          p_vehicle: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

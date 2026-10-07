export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
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
            foreignKeyName: "appointments_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
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
            foreignKeyName: "automation_runs_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_runs_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_runs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
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
            foreignKeyName: "follow_ups_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_ups_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
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
            foreignKeyName: "lead_activities_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lead_activities_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
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
            foreignKeyName: "leads_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
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
            foreignKeyName: "messages_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
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
            foreignKeyName: "quote_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
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
            foreignKeyName: "quotes_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
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
            foreignKeyName: "vehicles_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      reset_demo: { Args: never; Returns: undefined }
      seed_demo: { Args: never; Returns: undefined }
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

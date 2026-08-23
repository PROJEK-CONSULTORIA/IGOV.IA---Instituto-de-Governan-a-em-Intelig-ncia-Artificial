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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      answer_options: {
        Row: {
          answer_text: string
          created_at: string
          id: string
          interpretation: string | null
          level: number
          question_id: string
          recommended_action: string | null
          score: number
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          answer_text: string
          created_at?: string
          id?: string
          interpretation?: string | null
          level: number
          question_id: string
          recommended_action?: string | null
          score: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          answer_text?: string
          created_at?: string
          id?: string
          interpretation?: string | null
          level?: number
          question_id?: string
          recommended_action?: string | null
          score?: number
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          new_values: Json | null
          previous_values: Json | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          new_values?: Json | null
          previous_values?: Json | null
        }
        Relationships: []
      }
      consent_records: {
        Row: {
          accepted: boolean
          accepted_at: string
          consent_type: string
          id: string
          user_id: string
        }
        Insert: {
          accepted?: boolean
          accepted_at?: string
          consent_type: string
          id?: string
          user_id: string
        }
        Update: {
          accepted?: boolean
          accepted_at?: string
          consent_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      diagnostic_answers: {
        Row: {
          answer_option_id: string
          answer_text_snapshot: string
          answered_at: string
          diagnostic_id: string
          id: string
          interpretation_snapshot: string | null
          question_id: string
          recommended_action_snapshot: string | null
          score_snapshot: number
          updated_at: string
        }
        Insert: {
          answer_option_id: string
          answer_text_snapshot: string
          answered_at?: string
          diagnostic_id: string
          id?: string
          interpretation_snapshot?: string | null
          question_id: string
          recommended_action_snapshot?: string | null
          score_snapshot: number
          updated_at?: string
        }
        Update: {
          answer_option_id?: string
          answer_text_snapshot?: string
          answered_at?: string
          diagnostic_id?: string
          id?: string
          interpretation_snapshot?: string | null
          question_id?: string
          recommended_action_snapshot?: string | null
          score_snapshot?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_answers_answer_option_id_fkey"
            columns: ["answer_option_id"]
            isOneToOne: false
            referencedRelation: "answer_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnostic_answers_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnostic_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostic_scores: {
        Row: {
          computed_at: string
          diagnostic_id: string
          global_score: number
          id: string
          maturity_interpretation: string | null
          maturity_level: number
          maturity_name: string
          percentage: number
        }
        Insert: {
          computed_at?: string
          diagnostic_id: string
          global_score: number
          id?: string
          maturity_interpretation?: string | null
          maturity_level: number
          maturity_name: string
          percentage: number
        }
        Update: {
          computed_at?: string
          diagnostic_id?: string
          global_score?: number
          id?: string
          maturity_interpretation?: string | null
          maturity_level?: number
          maturity_name?: string
          percentage?: number
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_scores_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: true
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostics: {
        Row: {
          answered_count: number
          completed_at: string | null
          created_at: string
          current_dimension: number
          framework_version: string
          global_percentage: number | null
          global_score: number | null
          id: string
          last_activity_at: string
          maturity_level: number | null
          organization_id: string | null
          progress_percentage: number
          started_at: string
          status: Database["public"]["Enums"]["diagnostic_status"]
          subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          answered_count?: number
          completed_at?: string | null
          created_at?: string
          current_dimension?: number
          framework_version?: string
          global_percentage?: number | null
          global_score?: number | null
          id?: string
          last_activity_at?: string
          maturity_level?: number | null
          organization_id?: string | null
          progress_percentage?: number
          started_at?: string
          status?: Database["public"]["Enums"]["diagnostic_status"]
          subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          answered_count?: number
          completed_at?: string | null
          created_at?: string
          current_dimension?: number
          framework_version?: string
          global_percentage?: number | null
          global_score?: number | null
          id?: string
          last_activity_at?: string
          maturity_level?: number | null
          organization_id?: string | null
          progress_percentage?: number
          started_at?: string
          status?: Database["public"]["Enums"]["diagnostic_status"]
          subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diagnostics_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      dimension_scores: {
        Row: {
          created_at: string
          diagnostic_id: string
          dimension_id: string
          dimension_name: string
          dimension_position: number
          id: string
          maturity_level: number
          score: number
        }
        Insert: {
          created_at?: string
          diagnostic_id: string
          dimension_id: string
          dimension_name: string
          dimension_position: number
          id?: string
          maturity_level: number
          score: number
        }
        Update: {
          created_at?: string
          diagnostic_id?: string
          dimension_id?: string
          dimension_name?: string
          dimension_position?: number
          id?: string
          maturity_level?: number
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "dimension_scores_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dimension_scores_dimension_id_fkey"
            columns: ["dimension_id"]
            isOneToOne: false
            referencedRelation: "dimensions"
            referencedColumns: ["id"]
          },
        ]
      }
      dimensions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          position: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          position: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          position?: number
          updated_at?: string
        }
        Relationships: []
      }
      maturity_levels: {
        Row: {
          created_at: string
          id: string
          interpretation: string | null
          level: number
          max_score: number
          min_score: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          interpretation?: string | null
          level: number
          max_score: number
          min_score: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          interpretation?: string | null
          level?: number
          max_score?: number
          min_score?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          access_days: number
          created_at: string
          diagnostics_limit: number
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          access_days: number
          created_at?: string
          diagnostics_limit: number
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          access_days?: number
          created_at?: string
          diagnostics_limit?: number
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          organization_id: string | null
          organization_name: string
          phone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          organization_id?: string | null
          organization_name: string
          phone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          organization_id?: string | null
          organization_name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string
          dimension_id: string
          id: string
          number: number
          position: number
          statement: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          dimension_id: string
          id?: string
          number: number
          position: number
          statement: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          dimension_id?: string
          id?: string
          number?: number
          position?: number
          statement?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "questions_dimension_id_fkey"
            columns: ["dimension_id"]
            isOneToOne: false
            referencedRelation: "dimensions"
            referencedColumns: ["id"]
          },
        ]
      }
      report_priority_rules: {
        Row: {
          created_at: string
          id: string
          label: string
          max_score: number
          min_score: number
          rank: number
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
          max_score: number
          min_score: number
          rank: number
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
          max_score?: number
          min_score?: number
          rank?: number
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          diagnostic_id: string
          file_name: string | null
          framework_version: string
          generated_at: string | null
          id: string
          organization_id: string | null
          public_report_id: string
          report_type: string
          status: Database["public"]["Enums"]["report_status"]
          storage_path: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnostic_id: string
          file_name?: string | null
          framework_version?: string
          generated_at?: string | null
          id?: string
          organization_id?: string | null
          public_report_id: string
          report_type?: string
          status?: Database["public"]["Enums"]["report_status"]
          storage_path?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnostic_id?: string
          file_name?: string | null
          framework_version?: string
          generated_at?: string | null
          id?: string
          organization_id?: string | null
          public_report_id?: string
          report_type?: string
          status?: Database["public"]["Enums"]["report_status"]
          storage_path?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: true
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          diagnostics_limit_snapshot: number
          expires_at: string
          id: string
          plan_id: string
          started_at: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnostics_limit_snapshot: number
          expires_at: string
          id?: string
          plan_id: string
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnostics_limit_snapshot?: number
          expires_at?: string
          id?: string
          plan_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "USER" | "ADMIN" | "SUPER_ADMIN"
      content_status: "DRAFT" | "ACTIVE" | "ARCHIVED"
      diagnostic_status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
      report_status: "PENDING" | "GENERATING" | "READY" | "FAILED"
      subscription_status: "ACTIVE" | "EXPIRED"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["USER", "ADMIN", "SUPER_ADMIN"],
      content_status: ["DRAFT", "ACTIVE", "ARCHIVED"],
      diagnostic_status: ["IN_PROGRESS", "COMPLETED", "CANCELLED"],
      report_status: ["PENDING", "GENERATING", "READY", "FAILED"],
      subscription_status: ["ACTIVE", "EXPIRED"],
    },
  },
} as const

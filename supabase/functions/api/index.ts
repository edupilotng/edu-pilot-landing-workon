import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const url = new URL(req.url);
    const path = url.pathname;

    if (req.method === "POST") {
      const body = await req.json();

      if (path.includes("/contact")) {
        const { name, email, phone, message } = body;

        const { data, error } = await supabase
          .from("contact_inquiries")
          .insert({
            name,
            email,
            phone,
            message,
          })
          .select()
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            }
          );
        }

        return new Response(
          JSON.stringify({ success: true, data }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (path.includes("/marketer")) {
        const {
          name,
          region,
          institution,
          phone,
          email,
          experience,
          connections,
          motivation,
          source,
        } = body;

        const { data, error } = await supabase
          .from("marketer_applications")
          .insert({
            name,
            region,
            institution,
            phone,
            email,
            experience,
            connections,
            motivation,
            source,
          })
          .select()
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            }
          );
        }

        return new Response(
          JSON.stringify({ success: true, data }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (path.includes("/demo")) {
        const {
          school_name,
          name,
          title,
          email,
          phone,
          student_count,
          demo_date,
          demo_time,
          interests,
        } = body;

        const { data, error } = await supabase
          .from("demo_requests")
          .insert({
            school_name,
            name,
            title,
            email,
            phone,
            student_count,
            demo_date,
            demo_time,
            interests,
          })
          .select()
          .single();

        if (error) {
          return new Response(
            JSON.stringify({ error: error.message }),
            {
              status: 400,
              headers: {
                ...corsHeaders,
                "Content-Type": "application/json",
              },
            }
          );
        }

        return new Response(
          JSON.stringify({ success: true, data }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "Invalid endpoint" }),
        {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

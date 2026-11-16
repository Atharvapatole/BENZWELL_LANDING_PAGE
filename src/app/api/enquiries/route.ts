import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      full_name,
      company_name,
      email,
      country,
      phone,
      product_name,
      message,
      source_page,
    } = body;

    if (!full_name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    if (!supabase) {
      // In offline / fallback mode without Supabase connection
      return NextResponse.json({
        success: true,
        mode: "fallback",
        message: "Enquiry accepted in fallback mode",
      });
    }

    // 1. Check or Upsert Customer
    let customerId: string | null = null;
    try {
      const { data: existingCustomer } = await supabase
        .from("customers")
        .select("id, total_enquiries")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (existingCustomer) {
        customerId = existingCustomer.id;
        await supabase
          .from("customers")
          .update({
            last_enquiry_date: new Date().toISOString(),
            total_enquiries: (existingCustomer.total_enquiries || 1) + 1,
            company_name: company_name || undefined,
            country: country || undefined,
            contact_person: full_name || undefined,
          })
          .eq("id", customerId);
      } else {
        const { data: newCust, error: custErr } = await supabase
          .from("customers")
          .insert({
            company_name: company_name || full_name,
            contact_person: full_name,
            email: email.trim().toLowerCase(),
            phone: phone || null,
            country: country || "Unknown",
            status: "active",
            source: "website_enquiry",
            total_enquiries: 1,
            last_enquiry_date: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (!custErr && newCust) {
          customerId = newCust.id;
        }
      }
    } catch (e) {
      console.warn("Customer upsert warning:", e);
    }

    // 2. Insert Enquiry
    const { data: enquiry, error: enqErr } = await supabase
      .from("enquiries")
      .insert({
        customer_id: customerId,
        full_name: full_name.trim(),
        company_name: company_name?.trim() || "Individual / Independent",
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        country: country?.trim() || "Not Specified",
        product_name: product_name || null,
        message: message.trim(),
        source_page: source_page || "Website",
        status: "new",
        priority: "medium",
      })
      .select("id")
      .single();

    if (enqErr) {
      console.error("Enquiry insert error:", enqErr);
      return NextResponse.json({ error: enqErr.message }, { status: 500 });
    }

    // 3. Log Activity
    try {
      await supabase.from("activity_logs").insert({
        user_email: email.trim().toLowerCase(),
        action: "SUBMIT_ENQUIRY",
        resource_type: "enquiry",
        resource_id: enquiry.id,
        details: {
          product: product_name,
          country: country,
          company: company_name,
        },
      });
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      id: enquiry.id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process enquiry" },
      { status: 500 }
    );
  }
}

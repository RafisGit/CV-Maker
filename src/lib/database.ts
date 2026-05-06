import { createClient } from "@/lib/supabase/client";
import { CV, CVData, TemplateType, defaultCVData } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";



export async function getUserCVs(): Promise<CV[]> {
  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await createClient()
      .from("cvs")
      .select(
        `
        id,
        user_id,
        title,
        template,
        created_at,
        updated_at,
        cv_data (
          personal_info,
          education,
          experience,
          skills,
          projects,
          certifications
        )
      `
      )
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    return (data || []).map((cv) => {
      const cvDataRow = Array.isArray(cv.cv_data)
        ? cv.cv_data[0]
        : cv.cv_data;
      return {
        id: cv.id,
        user_id: cv.user_id,
        title: cv.title,
        template: cv.template as TemplateType,
        created_at: cv.created_at,
        updated_at: cv.updated_at,
        cv_data: cvDataRow
          ? {
              personalInfo: cvDataRow.personal_info || defaultCVData.personalInfo,
              education: cvDataRow.education || [],
              experience: cvDataRow.experience || [],
              skills: cvDataRow.skills || [],
              projects: cvDataRow.projects || [],
              certifications: cvDataRow.certifications || [],
            }
          : { ...defaultCVData },
      };
    });
  } catch (err: any) {
    console.error("Error in getUserCVs:", err.message || err);
    throw err;
  }
}

export async function getCVById(id: string): Promise<CV | null> {
  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await createClient()
      .from("cvs")
      .select(
        `
        id,
        user_id,
        title,
        template,
        created_at,
        updated_at,
        cv_data (
          personal_info,
          education,
          experience,
          skills,
          projects,
          certifications
        )
      `
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching CV by ID:", error.message);
      return null;
    }
    if (!data) return null;

    const cvDataRow = Array.isArray(data.cv_data)
      ? data.cv_data[0]
      : data.cv_data;

    return {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      template: data.template as TemplateType,
      created_at: data.created_at,
      updated_at: data.updated_at,
      cv_data: cvDataRow
        ? {
            personalInfo: cvDataRow.personal_info || defaultCVData.personalInfo,
            education: cvDataRow.education || [],
            experience: cvDataRow.experience || [],
            skills: cvDataRow.skills || [],
            projects: cvDataRow.projects || [],
            certifications: cvDataRow.certifications || [],
          }
        : { ...defaultCVData },
    };
  } catch (err: any) {
    console.error("Error in getCVById:", err.message || err);
    return null;
  }
}

export async function createCV(
  title: string,
  template: TemplateType = "modern"
): Promise<string> {
  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const cvId = uuidv4();

    const { error: cvError } = await createClient().from("cvs").insert({
      id: cvId,
      user_id: user.id,
      title,
      template,
    });

    if (cvError) throw cvError;

    const { error: dataError } = await createClient().from("cv_data").insert({
      id: uuidv4(),
      cv_id: cvId,
      personal_info: defaultCVData.personalInfo,
      education: defaultCVData.education,
      experience: defaultCVData.experience,
      skills: defaultCVData.skills,
      projects: defaultCVData.projects,
      certifications: defaultCVData.certifications,
    });

    if (dataError) throw dataError;

    return cvId;
  } catch (err: any) {
    console.error("Error in createCV:", err.message || err);
    throw err;
  }
}

export async function updateCV(
  id: string,
  title: string,
  template: TemplateType,
  cvData: CVData
): Promise<void> {
  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { error: cvError } = await createClient()
      .from("cvs")
      .update({
        title,
        template,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (cvError) throw cvError;

    const { error: dataError } = await createClient()
      .from("cv_data")
      .update({
        personal_info: cvData.personalInfo,
        education: cvData.education,
        experience: cvData.experience,
        skills: cvData.skills,
        projects: cvData.projects,
        certifications: cvData.certifications,
      })
      .eq("cv_id", id);

    if (dataError) throw dataError;
  } catch (err: any) {
    console.error("Error in updateCV:", err.message || err);
    throw err;
  }
}

export async function deleteCV(id: string): Promise<void> {
  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) throw new Error("Not authenticated");

    await createClient().from("cv_data").delete().eq("cv_id", id);

    const { error } = await createClient()
      .from("cvs")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  } catch (err: any) {
    console.error("Error in deleteCV:", err.message || err);
    throw err;
  }
}

export async function duplicateCV(id: string): Promise<string> {
  try {
    const cv = await getCVById(id);
    if (!cv) throw new Error("CV not found");

    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const newCvId = uuidv4();

    const { error: cvError } = await createClient().from("cvs").insert({
      id: newCvId,
      user_id: user.id,
      title: `${cv.title} (Copy)`,
      template: cv.template,
    });

    if (cvError) throw cvError;

    const { error: dataError } = await createClient().from("cv_data").insert({
      id: uuidv4(),
      cv_id: newCvId,
      personal_info: cv.cv_data.personalInfo,
      education: cv.cv_data.education,
      experience: cv.cv_data.experience,
      skills: cv.cv_data.skills,
      projects: cv.cv_data.projects,
      certifications: cv.cv_data.certifications,
    });

    if (dataError) throw dataError;

    return newCvId;
  } catch (err: any) {
    console.error("Error in duplicateCV:", err.message || err);
    throw err;
  }
}

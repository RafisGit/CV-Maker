import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { CV, CVData, TemplateType, defaultCVData } from "@/types/cv";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "cv_maker_local_cvs";

function getLocalCVs(): CV[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveLocalCVs(cvs: CV[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvs));
  } catch (err) {
    console.error("Error saving CVs to LocalStorage:", err);
  }
}

export async function getUserCVs(): Promise<CV[]> {
  if (!isSupabaseConfigured()) {
    return getLocalCVs();
  }

  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) return getLocalCVs();

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
    console.warn("Falling back to local storage for getUserCVs:", err.message || err);
    return getLocalCVs();
  }
}

export async function getCVById(id: string): Promise<CV | null> {
  if (!isSupabaseConfigured()) {
    const cvs = getLocalCVs();
    return cvs.find((c) => c.id === id) || null;
  }

  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) {
      const cvs = getLocalCVs();
      return cvs.find((c) => c.id === id) || null;
    }

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

    if (error || !data) {
      const cvs = getLocalCVs();
      return cvs.find((c) => c.id === id) || null;
    }

    const cvDataRow = Array.isArray(data.cv_data)
      ? data.cv_data[0]
      : data.cv_data;

    return {
      id: data.id,
      user_id: data.user_id,
      title: data.title,
      template: data.template as TemplateType,
      colorTheme: (data as any).colorTheme || "blue",
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
    console.warn("Falling back to local storage for getCVById:", err.message || err);
    const cvs = getLocalCVs();
    return cvs.find((c) => c.id === id) || null;
  }
}

export async function createCV(
  title: string,
  template: TemplateType = "modern"
): Promise<string> {
  const cvId = uuidv4();
  const now = new Date().toISOString();

  const newCv: CV = {
    id: cvId,
    user_id: "demo-user",
    title,
    template,
    created_at: now,
    updated_at: now,
    cv_data: JSON.parse(JSON.stringify(defaultCVData)),
  };

  if (!isSupabaseConfigured()) {
    const cvs = getLocalCVs();
    cvs.unshift(newCv);
    saveLocalCVs(cvs);
    return cvId;
  }

  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) {
      const cvs = getLocalCVs();
      cvs.unshift(newCv);
      saveLocalCVs(cvs);
      return cvId;
    }

    newCv.user_id = user.id;

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
    console.warn("Falling back to local storage for createCV:", err.message || err);
    const cvs = getLocalCVs();
    cvs.unshift(newCv);
    saveLocalCVs(cvs);
    return cvId;
  }
}

export async function updateCV(
  id: string,
  title: string,
  template: TemplateType,
  cvData: CVData,
  colorTheme?: string
): Promise<void> {
  const now = new Date().toISOString();

  // Always update local storage as backup
  const cvs = getLocalCVs();
  const index = cvs.findIndex((c) => c.id === id);
  if (index !== -1) {
    cvs[index] = {
      ...cvs[index],
      title,
      template,
      colorTheme: colorTheme || cvs[index].colorTheme || "blue",
      cv_data: cvData,
      updated_at: now,
    };
    saveLocalCVs(cvs);
  } else {
    cvs.unshift({
      id,
      user_id: "demo-user",
      title,
      template,
      colorTheme: colorTheme || "blue",
      created_at: now,
      updated_at: now,
      cv_data: cvData,
    });
    saveLocalCVs(cvs);
  }

  if (!isSupabaseConfigured()) return;

  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) return;

    const { error: cvError } = await createClient()
      .from("cvs")
      .update({
        title,
        template,
        updated_at: now,
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
    console.warn("Falling back to local storage for updateCV:", err.message || err);
  }
}

export async function deleteCV(id: string): Promise<void> {
  const cvs = getLocalCVs().filter((c) => c.id !== id);
  saveLocalCVs(cvs);

  if (!isSupabaseConfigured()) return;

  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) return;

    await createClient().from("cv_data").delete().eq("cv_id", id);

    const { error } = await createClient()
      .from("cvs")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  } catch (err: any) {
    console.warn("Falling back to local storage for deleteCV:", err.message || err);
  }
}

export async function duplicateCV(id: string): Promise<string> {
  const cv = await getCVById(id);
  if (!cv) throw new Error("CV not found");

  const newCvId = uuidv4();
  const now = new Date().toISOString();

  const newCv: CV = {
    id: newCvId,
    user_id: cv.user_id,
    title: `${cv.title} (Copy)`,
    template: cv.template,
    created_at: now,
    updated_at: now,
    cv_data: JSON.parse(JSON.stringify(cv.cv_data)),
  };

  if (!isSupabaseConfigured()) {
    const cvs = getLocalCVs();
    cvs.unshift(newCv);
    saveLocalCVs(cvs);
    return newCvId;
  }

  try {
    const {
      data: { user },
    } = await createClient().auth.getUser();
    if (!user) {
      const cvs = getLocalCVs();
      cvs.unshift(newCv);
      saveLocalCVs(cvs);
      return newCvId;
    }

    const { error: cvError } = await createClient().from("cvs").insert({
      id: newCvId,
      user_id: user.id,
      title: newCv.title,
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
    console.warn("Falling back to local storage for duplicateCV:", err.message || err);
    const cvs = getLocalCVs();
    cvs.unshift(newCv);
    saveLocalCVs(cvs);
    return newCvId;
  }
}

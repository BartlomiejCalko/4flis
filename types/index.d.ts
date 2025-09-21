interface Feedback {
    id: string;
    interviewId: string;
    totalScore: number;
    categoryScores: Array<{
      name: string;
      score: number;
      comment: string;
    }>;
    strengths: string[];
    areasForImprovement: string[];
    finalAssessment: string;
    createdAt: string;
  }
  
  interface Interview {
    id: string;
    role: string;
    level: string;
    questions: string[];
    techstack: string[];
    createdAt: string;
    userId: string;
    type: string;
    finalized: boolean;
  }
  
  interface CreateFeedbackParams {
    interviewId: string;
    userId: string;
    transcript: { role: string; content: string }[];
    feedbackId?: string;
  }
  
  interface User {
    name: string;
    email: string;
    id: string;
  }
  
  interface InterviewCardProps {
    interviewId?: string;
    userId?: string;
    role: string;
    type: string;
    techstack: string[];
    createdAt?: string;
  }
  
  interface AgentProps {
    userName: string;
    userId?: string;
    interviewId?: string;
    feedbackId?: string;
    type: "generate" | "interview";
    questions?: string[];
  }
  
  interface RouteParams {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string, string>>;
  }
  
  interface GetFeedbackByInterviewIdParams {
    interviewId: string;
    userId: string;
  }
  
  interface GetLatestInterviewsParams {
    userId: string;
    limit?: number;
  }
  
  interface SignInParams {
    email: string;
    idToken: string;
  }
  
  interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
  }
  
  type FormType = "sign-in" | "sign-up";
  
  interface InterviewFormProps {
    interviewId: string;
    role: string;
    level: string;
    type: string;
    techstack: string[];
    amount: number;
  }
  
  interface TechIconProps {
    techStack: string[];
  }

// Project management
interface ProjectImage {
  id: string;
  url: string;
  path: string; // storage path for deletion
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
  userId: string; // owner
}

interface CreateProjectInput {
  name: string;
  description: string;
  images: Array<{ url: string; path: string }>; // from upload
}

interface UpdateProjectInput {
  id: string;
  name?: string;
  description?: string;
  images?: Array<{ id?: string; url: string; path: string }>; // replace set
}
  
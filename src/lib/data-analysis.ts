import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface JobApplication {
  company: string;
  role: string;
  location: string;
  salary: string;
  status: string;
  fitScore: string;
  fileName: string;
}

export interface ProjectStats {
  name: string;
  postCount: number;
  totalReadTime: number;
  wordCount: number;
  lastUpdated: string;
  slug: string;
}

const APPLICATIONS_DIR = path.join(process.cwd(), 'src/content/marketing/job-applications/applications');
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

export function getJobApplications(): JobApplication[] {
  if (!fs.existsSync(APPLICATIONS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(APPLICATIONS_DIR).filter(file => file.endsWith('.md'));
  
  const applications: JobApplication[] = files.map(file => {
    const filePath = path.join(APPLICATIONS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Simple regex parsing for the specific table format found in these files
    const extractField = (fieldName: string): string => {
      // Look for | **Field** | Value | format
      // Adjust regex to be flexible with whitespace and markdown table structure
      const regex = new RegExp(`\|\s*\*\*${fieldName}\*\*\s*\|\s*([^|]+)\s*\|`, 'i');
      const match = content.match(regex);
      return match ? match[1].trim() : 'Unknown';
    };

    return {
      company: extractField('Company'),
      role: extractField('Role'),
      location: extractField('Location'),
      salary: extractField('Salary'),
      status: extractField('Status'),
      fitScore: extractField('Fit Score'),
      fileName: file
    };
  });

  return applications;
}

export function getProjectStats(): ProjectStats[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const projects = fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const stats: ProjectStats[] = projects.map(project => {
    const projectDir = path.join(BLOG_DIR, project);
    const files = fs.readdirSync(projectDir).filter(file => file.endsWith('.md') && file !== 'README.md');
    
    let totalReadTime = 0;
    let wordCount = 0;
    let dates: number[] = [];

    files.forEach(file => {
      const filePath = path.join(projectDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      if (data.readTime) {
        totalReadTime += Number(data.readTime);
      }
      
      // Rough word count
      const words = content.split(/\s+/).length;
      wordCount += words;

      if (data.date) {
        dates.push(new Date(data.date).getTime());
      }
    });

    const lastUpdated = dates.length > 0 ? new Date(Math.max(...dates)).toISOString() : new Date().toISOString();

    return {
      name: project.replace('-blog', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      postCount: files.length,
      totalReadTime,
      wordCount,
      lastUpdated,
      slug: project
    };
  });

  return stats;
}

import profile from './profile.json'

// Keep all editable personal information in profile.json.
export const portfolio = profile as typeof profile & { resumeUrl: string | null }

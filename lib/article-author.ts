import { brandLogoPath } from "@/lib/brand";
import { teamMembers, type TeamMember } from "@/lib/content/team-members";

export type ArticleAuthorProfile = {
  id: string;
  displayName: string;
  specialty: string;
  yearsExperience: number;
  image: string;
  teamHref: string;
};

export const defaultArticleAuthorId = "ahmed-fathy";

const teamById = new Map(teamMembers.map((member) => [member.id, member]));

export function formatTeamMemberName(member: TeamMember): string {
  return member.honorific ? `${member.honorific} ${member.name}` : member.name;
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamById.get(id);
}

export function resolveArticleAuthorProfile(input?: {
  authorId?: string | null;
  author?: string | null;
}): ArticleAuthorProfile {
  const authorId = input?.authorId?.trim();
  if (authorId) {
    const member = getTeamMemberById(authorId);
    if (member) return toAuthorProfile(member);
  }

  const legacyName = input?.author?.trim();
  if (legacyName) {
    const byName = teamMembers.find(
      (member) =>
        formatTeamMemberName(member) === legacyName ||
        member.name === legacyName ||
        legacyName.includes(member.name),
    );
    if (byName) return toAuthorProfile(byName);
  }

  const fallback = getTeamMemberById(defaultArticleAuthorId) ?? teamMembers[0];
  return toAuthorProfile(fallback);
}

export function resolveArticleAuthorName(input?: {
  authorId?: string | null;
  author?: string | null;
}): string {
  return resolveArticleAuthorProfile(input).displayName;
}

export function buildArticleAuthorSchema(input?: {
  authorId?: string | null;
  author?: string | null;
}) {
  const profile = resolveArticleAuthorProfile(input);
  return {
    "@type": "Person" as const,
    name: profile.displayName,
    jobTitle: profile.specialty,
    url: profile.teamHref,
  };
}

function toAuthorProfile(member: TeamMember): ArticleAuthorProfile {
  return {
    id: member.id,
    displayName: formatTeamMemberName(member),
    specialty: member.specialty,
    yearsExperience: member.yearsExperience,
    image: member.image ?? brandLogoPath,
    teamHref: `/team#${member.id}`,
  };
}

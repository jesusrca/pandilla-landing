import ScrollContainer from '@/components/ScrollContainer';
import MenuSection from '@/components/MenuSection';
import {
  HeroSection,
  CharacterSection,
  PowerSection,
  TeamSection,
  DeliciousSection,
  FinalSection
} from '@/components/Sections';

export default function Home() {
  return (
    <main>
      <ScrollContainer>
        <HeroSection />
        <CharacterSection />
        <MenuSection />
        <PowerSection />
        <TeamSection />
        <DeliciousSection />
        <FinalSection />
      </ScrollContainer>
    </main>
  );
}

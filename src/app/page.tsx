import ScrollContainer from '@/components/ScrollContainer';
import MenuSection from '@/components/MenuSection';
import {
  HeroSection,
  CharacterSection,
  PowerSection,
  DeliciousSection
} from '@/components/Sections';

export default function Home() {
  return (
    <main>
      <ScrollContainer>
        <HeroSection />
        <CharacterSection />
        <MenuSection />
        <PowerSection />
        <DeliciousSection />
      </ScrollContainer>
    </main>
  );
}

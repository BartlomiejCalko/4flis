import { ProjectGallery } from '@/components/ProjectGallery';

const Page = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Våre Prosjekter</h1>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Her finner du et utvalg av våre nylige prosjekter og leveranser. 
          Utforsk vårt arbeid og la deg inspirere.
        </p>
      </div>
      
      <ProjectGallery />
    </main>
  );
};

export default Page; 
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { site } from '@/data/site'

export function WorkshopMap() {
  const mapSrc =
    'https://maps.google.com/maps?q=23.0164302,72.4935926+(Raj+Fabrication)&t=&z=16&ie=UTF8&iwloc=B&output=embed'

  return (
    <section className="pb-16 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[540px] overflow-hidden rounded-lg border border-line bg-surface shadow-xs group">
            {/* Top-Right Floating Button */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10">
              <Button
                variant="white"
                size="sm"
                href={site.maps}
                target="_blank"
                rightIcon={<ArrowUpRight size={14} />}
                className="shadow-md hover:shadow-lg border border-black/10 transition-all hover:scale-[1.02]"
              >
                Locate on Google Maps
              </Button>
            </div>

            <iframe
              title="Raj Fabrication Workshop Location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

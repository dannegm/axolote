import Link from 'next/link';
import ClientOnly from '@/modules/core/components/common/client-only';
import CardItem from './card-item';

import { Button } from '@/modules/shadcn/ui/button';
import { BadgePlus } from 'lucide-react';
import FloatingElement from '@/modules/core/components/common/floating-element';
import { Separator } from '@/modules/shadcn/ui/separator';

export default function CardsList({ data = [] }) {
    return (
        <ClientOnly>
            <div className='grid grid-flow-row pb-16'>
                <FloatingElement
                    offset={140}
                    staticElement={
                        <div className='w-full mt-2'>
                            <Button className='w-full' size='lg' asChild>
                                <Link href='/krystel/secrets/editor'>
                                    <BadgePlus /> Crear nueva tarjeta
                                </Link>
                            </Button>
                        </div>
                    }
                    floatingElement={
                        <div className='fixed z-50 bottom-16 right-4 animate-in slide-in-from-right slud'>
                            <Link
                                className='flex-center size-16 sm:size-12 bg-white text-black rounded-full shadow-lg transition-all duration-150 ease-in-out hover:scale-105 active:scale-95'
                                href='/krystel/secrets/editor'
                            >
                                <BadgePlus />
                            </Link>
                        </div>
                    }
                />

                <div className='mt-4' />

                {data?.map(item => (
                    <div key={`card-item-${item.id}`}>
                        <Separator />
                        <CardItem item={item} />
                    </div>
                ))}
            </div>
        </ClientOnly>
    );
}

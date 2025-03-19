import { cn } from '@/modules/core/helpers/utils';
import ActionButton from './action-button';

export default function ToolsGrid() {
    return (
        <>
            <h2 className='font-bold text-xl mt-4 mb-2'>Events</h2>
            <div className={cn('grid grid-cols-4 gap-2', 'sm:grid-cols-6', 'xl:grid-cols-8')}>
                <ActionButton
                    icon='CloudRain'
                    label='Raining'
                    color='sky'
                    action='toggle:raining'
                />
                <ActionButton
                    icon='CloudSnow'
                    label='Snowing'
                    color='teal'
                    action='toggle:snowing'
                />
                <ActionButton icon='Gift' label='Balloons' color='green' action='summon:balloons' />
                <ActionButton icon='Heart' label='Hearts' color='red' action='particles:hearts' />
                <ActionButton icon='Sparkles' label='Stars' color='blue' action='particles:stars' />
                <ActionButton icon='Snowflake' label='Snow' color='cyan' action='particles:snow' />
            </div>
        </>
    );
}

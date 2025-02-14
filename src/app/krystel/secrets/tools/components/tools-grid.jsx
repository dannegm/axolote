import ActionButton from './action-button';

export default function ToolsGrid() {
    return (
        <div className='flex flex-row flex-wrap gap-2 pt-4 pb-16'>
            <ActionButton icon='CloudRain' label='Raining' color='sky' action='toggle:raining' />
            <ActionButton icon='CloudSnow' label='Snowing' color='teal' action='toggle:snowing' />
            <ActionButton icon='Gift' label='Balloons' color='green' action='summon:balloons' />
            <ActionButton icon='Heart' label='Hearts' color='red' action='particles:hearts' />
            <ActionButton icon='Sparkles' label='Stars' color='blue' action='particles:stars' />
            <ActionButton icon='Snowflake' label='Snow' color='cyan' action='particles:snow' />
        </div>
    );
}

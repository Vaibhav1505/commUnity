export default function WebsiteName({ color = 'primary', size = 'xl', fontweight = 'extrabold' }) {
    return <p className={`text-${color} text-${size} font-${fontweight}`}>CommUnity</p>
}
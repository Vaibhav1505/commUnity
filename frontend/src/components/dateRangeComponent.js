import { DateRangePicker } from "@nextui-org/react";

export default function DateRangeComponent({ value, onChange }) {

  const handleChange = (range) => {
    if (!range || !range.start || !range.end) {
        console.error('Invalid range object:', range);
        return;
    }

    console.log('Received Range:', JSON.stringify(range));

    // Extract date components
    const start = range.start;
    const end = range.end;

    const startDate = new Date(start.year, start.month - 1, start.day); // Adjust month (0-based)
    const endDate = new Date(end.year, end.month - 1, end.day); // Adjust month (0-based)

    console.log('StartDate:', startDate, 'EndDate:', endDate);

    const updatedRange = {
        start: startDate,
        end: endDate,
    };

    if (onChange) {
        onChange(updatedRange); // Pass the updated range back to parent
    }
};





  return (
    <DateRangePicker
      label="Duration"
      isRequired
      labelPlacement="outside"
      value={value}
      onChange={handleChange}
      color="transparent"
      variant="bordered"

    />
  );
}
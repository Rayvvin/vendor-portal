// import React from 'react';
// import { useInput } from 'react-admin';
// import RawChipInput from 'material-ui-chip-input';

// export function CustomChipInput(props) {
//   const {
//     input: { value, onChange, ...rest },
//     meta: { touched, error },
//     isRequired,
//   } = useInput(props);

//   if (value && !Array.isArray(value)) {
//     throw new Error(
//       `ChipInput requires an array value but received: ${JSON.stringify(
//         value,
//       )}`,
//     );
//   }

//   return (
//     <RawChipInput
//       value={value || []}
//       label={props.label}
//       onAdd={(newChip) => onChange((value || []).concat(newChip))}
//       onDelete={(deletedChip) =>
//         onChange((value || []).filter((item) => item !== deletedChip))
//       }
//       error={!!(touched && error)}
//       helperText={touched && error}
//       required={isRequired}
//       {...rest}
//     />
//   );
// }


export const handlePhoneChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setPhone: any,
  ) => {
    const value = event.target.value;
    const phoneNumbers = value.replace(/[^0-9]/g, '');
  
    let formattedPhone = '';

  if (phoneNumbers.length <= 2) {
    formattedPhone = phoneNumbers;
  } else if (phoneNumbers.length <= 7) {
    formattedPhone = `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(2)}`;
  } else if (phoneNumbers.length <= 11) {
    formattedPhone = `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(
      2,
      7
    )}-${phoneNumbers.slice(7)}`;
  } else {
    formattedPhone = `(${phoneNumbers.slice(0, 2)}) ${phoneNumbers.slice(
      2,
      7
    )}-${phoneNumbers.slice(7, 11)}`;
  }

  setPhone(formattedPhone);

};

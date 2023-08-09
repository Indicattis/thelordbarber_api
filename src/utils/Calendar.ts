import dayjs from 'dayjs';

export const generateDate = (month = dayjs().month(), year = dayjs().year()) => {
    const today = dayjs();
    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');
  
    const arrayOfDate = [];
  
    // Cria datas do mês anterior
    for (let i = 0; i < firstDateOfMonth.day(); i++) {
      const date = firstDateOfMonth.subtract(firstDateOfMonth.day() - i, 'day');
      arrayOfDate.push({ currentMonth: false, date });
    }
  
    // Cria datas
    for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
      const date = firstDateOfMonth.date(i);
      const isToday = date.toDate().toDateString() === today.toDate().toDateString();
      if (date.isBefore(today, 'day')) {
        // Ignora os dias anteriores ao atual
        arrayOfDate.push({ date, currentMonth: true, today: isToday, ignore: true });
      } else {
        if (date.day() === 0) {
          // Verifica se é domingo
          arrayOfDate.push({ date, currentMonth: true, today: isToday, sunday: true });
        } else {
          arrayOfDate.push({ date, currentMonth: true, today: isToday });
        }
      }
    }
  
    const remaining = 42 - arrayOfDate.length;
  
    for (let i = 1; i <= remaining; i++) {
      const date = lastDateOfMonth.date(lastDateOfMonth.date() + i);
      if (date.day() !== 0) {
        // Verifica se não é domingo
        arrayOfDate.push({ date, currentMonth: false });
      }
    }
  
    return arrayOfDate;
  };
  


export const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
]
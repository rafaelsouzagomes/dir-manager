export function convertDateToDDmmYYYY(data: Date): string{
  const dia = data.getDate().toString().padStart(2, '0'); 
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
  const ano = data.getFullYear();
  return `${dia}-${mes}-${ano}`;
}

export function convertDateTommYYYY(data: Date): string{
  const mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
  const ano = data.getFullYear();
  return `${mes}-${ano}`;
}
export const usuarios = async () => {
  const data = await fetch(`http://127.0.0.1:3000/users`);
  const usuario = await data.json();
  return usuario;
}

export const documento = async (id) => {
  const dom = await fetch(`http://127.0.0.1:3000/documento?id=${id}`);
  const res = await dom.json();
  return res;
}
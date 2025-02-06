export default function Button({ clasesCSS, children, ...props }) {
  const estilos = `px-4 py-2 font-semibold disabled:bg-gray-200 disabled:text-gray-700 ${clasesCSS}`;
  return (
    <button className={estilos} {...props}>
      {children}
    </button>
  );
}

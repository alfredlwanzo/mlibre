import React from "react";

type LogoProps={
    className?:string
}
export const Logo:React.FC<LogoProps> = (props) => {
  return (
    <svg
      width="553"
      height="512"
      viewBox="0 0 553 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M468.034 92.4702C475.121 54.5762 453.256 16.3479 415.634 3.94915C377.799 -8.5199 337.246 9.49065 320.587 44.5619L320.131 44.4137L318.624 49.0512C318.012 50.581 317.443 52.1397 316.92 53.7266L309.115 77.4109C309.189 77.4846 309.263 77.5584 309.338 77.6324L299.207 108.813C299.092 108.715 298.978 108.617 298.864 108.519L233.772 306.032C228.701 321.421 226.164 329.122 224.607 336.983C222.771 346.267 221.95 355.722 222.161 365.182C222.34 373.198 223.514 381.221 225.86 397.255L225.86 397.258L225.861 397.263L225.864 397.285L238.254 481.949C239.409 489.849 244.93 496.418 252.514 498.918C260.098 501.417 268.443 499.418 274.07 493.753L334.404 433.004L334.405 433.003C345.814 421.517 351.524 415.768 356.431 409.433C362.225 401.952 367.187 393.861 371.23 385.304C374.655 378.051 377.196 370.344 382.274 354.935L408.16 276.389L408.546 276.514L438.468 184.423L447.354 157.459L447.226 157.468L457.323 126.393L457.604 126.352L465.411 102.663C466.244 100.137 466.94 97.5988 467.505 95.0565L468.315 92.5617L468.034 92.4702ZM123.855 38.7904L212.342 212.095L173.229 332.037L154.504 295.877L142.579 269.009L137.754 292.819L137.746 292.864L94.1501 512H0L98.2025 38.7904H123.855ZM459.388 512L426.035 357.944L482.374 185.18L552.874 512H459.388Z"
        fill="currentColor"
      />
    </svg>
  );
};

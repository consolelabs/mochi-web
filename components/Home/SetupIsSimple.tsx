import { INVITE_LINK, TELEGRAM_LINK } from '~envs'

export default function SetupIsSimple() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="md:w-3/5 justify-center">
          <h2 className="text-[2rem] sm:text-5xl mb-4 sm:mb-6 font-heading tracking-[-0.5px] font-medium">
            Setup is <span className="text-[#ACACBD] font-normal">simple</span>
          </h2>
          <div className="mb-8 text-base sm:text-xl md:w-3/4">
            Make sending and receiving money with friends fun and easy. Turn
            financial transactions into personal connections.
          </div>
          <a
            target="blank"
            href={INVITE_LINK}
            className="inline-flex rounded-full overflow-hidden bg-discord text-white px-5 py-[10px] items-center font-semibold mr-2 text-xs sm:text-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mr-1"
            >
              <path
                d="M15.7691 4.38765C14.7135 3.89558 13.5706 3.53842 12.3801 3.33207C12.3697 3.33173 12.3593 3.33369 12.3497 3.33781C12.3401 3.34192 12.3315 3.34809 12.3246 3.35588C12.1817 3.61779 12.015 3.95907 11.9039 4.22098C10.6412 4.0305 9.35702 4.0305 8.09428 4.22098C7.98317 3.95113 7.8165 3.61779 7.6657 3.35588C7.65776 3.34 7.63395 3.33207 7.61014 3.33207C6.41963 3.53842 5.28468 3.89558 4.22116 4.38765C4.21322 4.38765 4.20529 4.39559 4.19735 4.40353C2.03856 7.63377 1.44331 10.7767 1.73697 13.8879C1.73697 13.9038 1.7449 13.9197 1.76078 13.9276C3.18939 14.9752 4.56244 15.6102 5.91962 16.0308C5.94343 16.0388 5.96724 16.0308 5.97518 16.015C6.29265 15.5784 6.57837 15.1181 6.82441 14.634C6.84028 14.6022 6.82441 14.5705 6.79266 14.5625C6.34027 14.3879 5.91168 14.1816 5.49104 13.9435C5.45929 13.9276 5.45929 13.88 5.4831 13.8562C5.5704 13.7927 5.65771 13.7212 5.74501 13.6577C5.76089 13.6419 5.7847 13.6419 5.80057 13.6498C8.5308 14.8959 11.4753 14.8959 14.1738 13.6498C14.1897 13.6419 14.2135 13.6419 14.2294 13.6577C14.3167 13.7292 14.404 13.7927 14.4913 13.8641C14.523 13.8879 14.523 13.9355 14.4833 13.9514C14.0706 14.1974 13.6341 14.3959 13.1817 14.5705C13.15 14.5784 13.142 14.6181 13.15 14.6419C13.404 15.126 13.6897 15.5864 13.9992 16.0229C14.023 16.0308 14.0468 16.0388 14.0706 16.0308C15.4358 15.6102 16.8088 14.9752 18.2374 13.9276C18.2533 13.9197 18.2612 13.9038 18.2612 13.8879C18.6104 10.2926 17.6818 7.17344 15.8008 4.40353C15.7929 4.39559 15.785 4.38765 15.7691 4.38765ZM7.23712 11.991C6.41963 11.991 5.73708 11.237 5.73708 10.3084C5.73708 9.37985 6.40376 8.62586 7.23712 8.62586C8.07841 8.62586 8.74509 9.38779 8.73716 10.3084C8.73716 11.237 8.07047 11.991 7.23712 11.991ZM12.769 11.991C11.9515 11.991 11.269 11.237 11.269 10.3084C11.269 9.37985 11.9357 8.62586 12.769 8.62586C13.6103 8.62586 14.277 9.38779 14.2691 10.3084C14.2691 11.237 13.6103 11.991 12.769 11.991Z"
                fill="white"
              />
            </svg>
            Add Discord
          </a>
          <a
            target="blank"
            href={TELEGRAM_LINK}
            className="inline-flex rounded-full overflow-hidden bg-[#059FDB] text-white px-5 py-[10px] items-center font-semibold text-xs sm:text-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mr-2"
            >
              <path
                d="M10.0003 1.66797C5.40033 1.66797 1.66699 5.4013 1.66699 10.0013C1.66699 14.6013 5.40033 18.3346 10.0003 18.3346C14.6003 18.3346 18.3337 14.6013 18.3337 10.0013C18.3337 5.4013 14.6003 1.66797 10.0003 1.66797ZM13.867 7.33464C13.742 8.6513 13.2003 11.8513 12.9253 13.3263C12.8087 13.9513 12.5753 14.1596 12.3587 14.1846C11.8753 14.2263 11.5087 13.868 11.042 13.5596C10.3087 13.0763 9.89199 12.7763 9.18366 12.3096C8.35866 11.768 8.89199 11.468 9.36699 10.9846C9.49199 10.8596 11.6253 8.91797 11.667 8.74297C11.6728 8.71646 11.672 8.68895 11.6647 8.66281C11.6575 8.63666 11.644 8.61269 11.6253 8.59297C11.5753 8.5513 11.5087 8.56797 11.4503 8.5763C11.3753 8.59297 10.2087 9.36797 7.93366 10.9013C7.60033 11.1263 7.30033 11.243 7.03366 11.2346C6.73366 11.2263 6.16699 11.068 5.74199 10.9263C5.21699 10.7596 4.80866 10.668 4.84199 10.3763C4.85866 10.2263 5.06699 10.0763 5.45866 9.91797C7.89199 8.85964 9.50866 8.15964 10.317 7.8263C12.6337 6.85964 13.1087 6.69297 13.4253 6.69297C13.492 6.69297 13.6503 6.70964 13.7503 6.79297C13.8337 6.85964 13.8587 6.9513 13.867 7.01797C13.8587 7.06797 13.8753 7.21797 13.867 7.33464Z"
                fill="white"
              />
            </svg>
            Add Telegram
          </a>
        </div>
      </div>
      <svg
        viewBox="0 0 588 443"
        fill="none"
        className="absolute hidden md:block top-0 bottom-0 right-0 h-full w-1/2"
      >
        <g clip-path="url(#clip0_5528_64832)">
          <path
            d="M148.509 74.3257C162.556 71.7672 173.097 70.7091 183.058 67.7381C190.735 65.4487 197.937 61.1557 204.859 56.9622C209.056 54.4169 211.339 54.6356 213.769 58.7704C222.565 73.7173 231.43 88.6334 240.424 103.464C243.09 107.854 242.099 110.627 238.14 113.768C221.329 127.125 201.42 131.885 180.766 133.355C161.557 134.735 144.174 140.282 128.323 150.849C124.51 153.394 121.527 152.284 119.363 149.092C109.738 134.91 100.175 120.674 91.0182 106.19C90.105 104.746 91.3056 100.333 92.8933 99.2529C99.9397 94.4306 107.109 89.4489 114.93 86.1708C127.01 81.104 139.669 77.3795 148.509 74.3257ZM171.477 116.485C171.485 116.23 171.481 115.977 171.489 115.722C173.443 115.102 175.445 114.609 177.334 113.842C183.687 111.283 187.699 105.351 187.377 99.2243C187.079 93.6618 182.873 89.009 176.219 86.8941C166.579 83.847 154.306 87.3929 148.412 94.9268C141.797 103.387 145.735 114.729 156.347 116.542C161.248 117.372 166.435 116.555 171.489 116.482L171.477 116.485Z"
            fill="#048441"
          />
          <path
            d="M211.077 391.607C193.696 386.938 176.305 382.255 158.916 377.621C155.04 376.598 153.728 374.226 154.565 370.435C157.696 356.232 160.801 342.035 163.933 327.832C164.106 327.102 164.179 326.262 164.584 325.675C165.906 323.737 167.358 321.892 168.765 320.024C170.565 321.462 172.75 322.611 174.103 324.387C184.316 337.735 194.316 351.235 204.484 364.611C210.848 372.982 216.391 374.241 226.213 369.972C241.36 363.393 256.476 356.732 271.713 350.363C273.851 349.472 277.493 349.13 278.871 350.319C280.333 351.579 280.757 355.182 280.212 357.426C277.101 370.26 273.465 382.96 270.237 395.754C269.139 400.114 266.305 401.853 262.359 401.393C254.677 400.496 246.983 399.382 239.4 397.853C229.917 395.946 220.548 393.562 211.118 391.378C211.101 391.449 211.084 391.521 211.067 391.593L211.077 391.607Z"
            fill="#D2CFD3"
          />
          <path
            d="M217.534 360.442C214.633 358.357 211.133 356.816 209.054 354.153C197.283 339.145 185.701 323.979 174.515 308.539C173.063 306.538 173.327 302.224 174.499 299.797C175.374 297.982 179.098 296.386 181.382 296.587C188.735 297.219 196.053 298.473 203.285 299.933C228.585 305.037 253.692 310.903 277.871 320.035C280.696 321.105 284.361 323.656 284.914 326.13C285.919 330.599 282.968 334.594 278.628 336.488C260.873 344.228 243.044 351.8 225.165 359.259C223.012 360.16 220.421 360.026 217.549 360.433L217.534 360.442Z"
            fill="#D2CFD3"
          />
          <path
            d="M384.385 398.772C369.136 398.772 353.875 398.796 338.625 398.772C329.426 398.747 326.907 395.918 328.401 386.929C330.612 373.604 335.526 361.356 344.268 350.897C349.787 344.296 353.405 343.904 360.629 348.46C368.939 353.714 377.236 358.98 385.447 364.357C388.818 366.562 391.596 366.317 394.251 363.292C398.523 358.429 402.771 353.53 407.179 348.803C415.44 339.936 424.12 339.544 432.8 347.921C439.826 354.706 447.124 361.332 449.988 371.301C453.853 384.749 445.185 397.841 431.245 398.209C415.637 398.625 400.005 398.307 384.385 398.307C384.385 398.466 384.385 398.625 384.385 398.784V398.772Z"
            fill="#91D5DD"
          />
          <path
            d="M386.78 293.41C388.447 293.41 390.126 293.3 391.781 293.435C403.61 294.365 408.944 299.901 408.228 311.536C407.882 317.145 407.166 323.134 404.832 328.131C398.597 341.456 374.852 343.33 366.493 331.144C363.443 326.698 361.258 320.832 360.974 315.492C360.282 302.375 367.962 294.623 381.224 293.435C383.064 293.263 384.928 293.41 386.78 293.41Z"
            fill="#91D5DD"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M71.8872 296.217C51.1152 296.668 39.6835 307.465 39.8203 326.492C39.906 339.043 45.9218 349.162 55.3298 354.183C50.9468 359.24 46.8843 365.482 43.8475 371.725C43.5267 372.385 43.1796 373.092 42.8137 373.836C36.9309 385.808 26.1949 407.656 41.8899 407.619C110.464 407.452 114.454 407.03 104.947 385.353L104.947 385.341C98.5393 370.737 93.0559 360.403 87.9945 353.609C96.7919 348.72 101.229 339.373 101.26 325.615C101.307 307.465 89.6848 295.831 71.8872 296.217Z"
            fill="#91D5DD"
          />
          <path
            d="M295.641 218.057C311.779 174.248 312.68 165.651 333.955 214.37C351.217 183.103 357.799 180.274 361.602 218.853C392.927 184.732 383.346 240.53 364.59 257.885C337.388 283.053 295.875 281.155 277.23 250.071C269.513 219.477 254.251 182.344 295.628 218.057H295.641Z"
            fill="#048441"
          />
          <path
            d="M46.8145 195.454C54.4947 203.451 61.7304 210.555 68.287 218.221C69.46 219.605 68.855 224.296 67.3609 225.815C55.2602 238.148 43.6782 251.301 29.96 261.626C23.7245 266.317 13.0561 265.337 4.33873 266.5C3.12866 266.659 0.350451 264.394 0.387494 263.316C0.646793 255.196 -1.64986 244.541 2.62241 239.446C15.5874 223.978 31.1577 210.665 46.8145 195.441V195.454Z"
            fill="#E8A907"
          />
          <path
            d="M80.6721 211.044C78.9928 209.77 77.1777 208.643 75.6713 207.198C70.9916 202.704 66.4723 198.025 61.7926 193.53C58.2488 190.138 54.8162 187.1 60.175 182.263C64.719 178.16 69.1394 173.481 75.3009 178.76C80.6844 183.365 85.7716 188.497 90.0192 194.106C91.5256 196.102 90.8712 200.45 89.9698 203.34C88.7721 207.149 86.352 210.566 84.4628 214.155C83.2033 213.114 81.9439 212.073 80.6844 211.032L80.6721 211.044Z"
            fill="#E8A907"
          />
          <path
            d="M335.878 84.5094C350.666 81.9365 365.45 79.3394 380.242 76.7907C386.635 75.6907 389.54 77.2907 390.786 83.7015C393.793 99.1991 396.586 114.759 399.022 130.356C400.188 137.79 395.817 143.197 387.751 144.613C366.619 148.352 345.437 151.813 324.264 155.322C309.646 158.077 289.53 161.964 285.295 142.818C282.64 129.016 280.737 115.07 278.518 101.179C277.898 97.2883 279.87 95.3507 283.488 94.634C300.949 91.247 318.346 87.5723 335.838 84.3545L335.866 84.5116L335.878 84.5094ZM381.896 107.784C380.116 98.2401 360.603 101.648 363.992 111.846C366.341 123.31 383.948 119.686 381.896 107.784Z"
            fill="#91D5DD"
          />
          <path
            d="M318.607 76.8818C306.246 79.034 293.893 81.3093 281.488 83.2196C278.174 83.8216 275.382 80.1177 277.565 77.3186C300.287 65.3192 324.46 55.3368 347.836 44.396C355.214 41.0787 358.819 43.3691 360.486 51.3715C360.84 57.4204 366.807 68.3778 357.077 68.9868C344.17 71.1717 331.861 74.5993 318.964 76.8446C319.033 77.2316 318.524 76.4848 318.595 76.8839L318.607 76.8818Z"
            fill="#91D5DD"
          />
          <path
            d="M654.378 57.0548C627.707 57.0548 601.024 57.0671 574.353 57.0303C571.526 57.0303 567.994 58.0101 567.192 53.7113C566.476 49.8289 567.723 47.1958 571.637 45.2852C585.849 38.3287 599.703 30.6129 614.125 24.1586C618.163 22.346 624.386 22.346 628.461 24.1096C643.475 30.6129 657.971 38.3165 672.776 45.3342C676.468 47.0855 677.431 49.9269 676.196 52.9275C675.468 54.6789 672.628 56.4425 670.591 56.6384C665.232 57.1528 659.787 56.8099 654.378 56.8099C654.378 56.8956 654.378 56.9814 654.378 57.0671V57.0548ZM620.916 47.9061C622.151 48.6899 622.904 48.2 623.472 47.6857C624.04 47.1713 627.819 43.9992 627.893 41.1211C627.942 39.2105 624.127 34.0054 621.941 33.9197C619.817 33.834 615.57 39.5657 615.767 41.1211C616.187 44.4279 619.682 47.1223 620.916 47.9061Z"
            fill="#D2CFD3"
          />
          <path
            d="M621.694 145.37C605.445 145.37 589.195 145.333 572.946 145.407C569.735 145.419 566.5 145.505 567.229 141.071C567.821 137.434 566.661 132.216 573.242 132.449C576.415 132.571 579.589 132.449 582.762 132.473C611.334 132.657 639.894 132.89 668.467 132.976C672.282 132.976 675.023 133.906 676.172 137.789C677.777 143.239 676.246 145.345 670.442 145.37C654.193 145.407 637.943 145.382 621.694 145.382V145.37Z"
            fill="#D2CFD3"
          />
          <path
            d="M582.392 66.3046C580.997 66.6231 579.861 67.4069 579.244 68.4234C578.453 69.7216 577.589 71.2036 577.589 72.5508C577.095 86.7821 576.984 101.026 576.774 115.269C575.255 123.157 586.084 122.899 592.345 121.711C593.95 121.405 595.271 120.523 595.876 119.335C598.778 113.567 596.641 101.307 597.568 95.3307C597.605 95.098 597.617 94.8776 597.592 94.6449C596.703 84.051 604.532 61.2343 582.392 66.3291V66.3046Z"
            fill="#D2CFD3"
          />
          <path
            d="M518.577 190.846L511.129 184.68C506.565 180.901 499.707 181.829 496.323 186.691L459.285 239.931C458.071 241.665 455.533 241.798 454.152 240.196L441.149 225.134C438.745 222.35 435.349 220.582 431.676 220.206L428.77 219.908C425.018 219.521 421.255 220.615 418.305 222.946L416.446 224.416C413.54 226.715 411.637 230.03 411.136 233.676C410.523 238.063 412.004 242.494 415.132 245.655L446.07 276.949C448.208 279.103 451.124 280.33 454.175 280.33H459.908C463.381 280.33 466.654 278.75 468.814 276.054L520.013 211.808C521.383 210.084 522.128 207.962 522.128 205.763V198.338C522.128 195.443 520.837 192.702 518.599 190.857L518.577 190.846Z"
            fill="#D2CFD3"
          />
          <path
            d="M535.078 64.2847C533.271 61.2641 531.312 58.2545 528.193 56.2935C517.903 40.5422 491.765 50.0314 486.435 64.8932C486.226 65.361 486.021 65.8404 485.812 66.3082C485.213 66.5807 484.934 67.0327 484.994 67.6836C484.473 68.0339 484.225 68.5015 484.316 69.1293C483.764 69.4639 483.59 69.9589 483.701 70.5675C481.666 72.7008 482.532 81.2365 478.33 78.4423C465.262 70.8553 435.208 68.8838 434.56 89.4388C430.693 112.912 449.798 137.186 468.496 149.796C471.097 151.371 473.405 152.372 476.797 153.393C487.38 159.793 503.908 170.957 515.425 162.058C528.63 135.385 550.83 93.0679 535.082 64.2964L535.078 64.2847Z"
            fill="#F4717D"
          />
          <path
            d="M619.933 214.123C618.446 214.534 616.829 214.116 615.804 212.975C601.069 196.69 576.074 189.519 554.323 209.561C521.908 238.739 560.712 296.801 595.212 281.807C615.985 275.219 625.789 263.116 628.053 250.083C628.318 248.561 629.474 247.339 630.985 246.922L685.786 231.788C686.761 231.519 687.602 230.906 688.145 230.056L702.882 207.26C703.518 206.284 703.692 205.079 703.378 203.958L701.126 195.935C700.516 193.764 698.251 192.495 696.062 193.1L619.933 214.123ZM588.867 255.413C576.21 260.916 561.979 239.624 573.867 228.916C591.92 212.273 616.101 246.773 588.867 255.413Z"
            fill="#F4717D"
          />
          <path
            d="M126.917 273.496L238.415 260.79C245.372 255.719 249.496 248.076 248.191 236.81C246.981 226.367 234.143 209.707 217.888 211.559C215.422 211.841 210.569 211.845 208.347 212.671C208.091 212.64 207.847 212.608 207.592 212.59C202.064 196.705 182.564 183.092 165.04 185.089C149.686 186.839 141.067 200.785 137.126 214.675C136.912 214.699 136.686 214.713 136.472 214.737C119.103 216.717 106.636 232.293 108.63 249.51C110.036 261.646 117.214 269.371 126.919 273.508L126.917 273.496Z"
            fill="#F4717D"
          />
          <path
            d="M591.809 381.45C596.053 381.298 599.409 377.819 599.353 373.597L598.577 313.241C598.549 311.151 597.675 309.157 596.136 307.713L585.082 297.316L583.293 297.344L474.987 298.705C470.729 298.76 466.028 302.418 466 306.654L466.901 376.513C466.901 377.86 467.248 379.194 467.914 380.377L468.594 381.56C470.036 384.076 472.754 385.589 475.667 385.493L591.809 381.45ZM559.729 368.468C559.243 368.468 558.855 368.083 558.855 367.602C558.439 360.561 557.676 352.543 558.855 349.917C558.855 349.436 559.243 349.05 559.729 349.05C568.813 348.913 578.286 348.748 582.585 349.05C583.071 349.05 583.459 349.436 583.459 349.917C584.028 356.133 584.097 362.06 583.459 367.602C583.459 368.083 583.071 368.468 582.585 368.468C573.723 368.922 565.401 369.183 559.729 368.468Z"
            fill="#E8A907"
          />
        </g>
        <defs>
          <clipPath id="clip0_5528_64832">
            <rect width="769" height="443" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </section>
  )
}

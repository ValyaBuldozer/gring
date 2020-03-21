import * as React from 'react';
import {SvgIcon, SvgIconProps} from "@material-ui/core";

export default function RouteIcon(props: SvgIconProps) {
	const path = "M1180 1652 c-70 -20 -210 -124 -210 -157 0 -6 -10 -29 -21 -50 -43 -80 -22 -210 49 -299 12 -16 22 -33 22 " +
		"-38 0 -6 21 -34 46 -64 55 -64 52 -71 -35 -104 -89 -33 -120 -74 -174 -232 -4 -10 -11 -18 -16 -18 -10 0 -12 6 " +
		"-30 76 -25 94 -178 194 -296 194 -76 0 -169 -37 -225 -90 -100 -93 -142 -240 -94 -320 12 -19 25 -46 29 -60 4 -14" +
		" 17 -37 29 -52 11 -15 32 -43 46 -63 39 -56 87 -116 126 -157 l36 -38 507 0 507 0 35 38 c71 74 74 221 7 297 -17" +
		" 19 -49 47 -71 62 -38 27 -45 28 -203 33 l-164 5 -30 31 c-24 24 -31 40 -32 71 -1 80 31 101 162 106 75 3 75 3 129" +
		" 52 56 52 141 158 141 175 0 6 7 13 15 17 9 3 25 22 36 42 11 20 26 47 34 61 34 61 65 141 65 170 0 47 -57 169 -99" +
		" 213 -56 60 -140 98 -225 102 -39 2 -82 1 -96 -3z m173 -243 c24 -25 37 -48 37 -65 0 -56 -71 -124 -129 -124 -35 0" +
		" -86 26 -109 55 -66 83 19 195 133 178 18 -3 46 -21 68 -44z m-747 -691 c62 -61 45 -136 -42 -185 -45 -25 -70 -22 " +
		"-127 15 -42 28 -58 68 -46 120 4 19 9 35 11 36 1 1 19 15 38 30 30 24 40 28 83 23 39 -3 56 -11 83 -39z m298 -106" +
		" c11 -33 26 -53 46 -65 17 -10 30 -22 30 -27 0 -20 75 -33 215 -37 147 -3 151 -4 190 -32 70 -50 69 -112 -2 -158 " +
		"-24 -16 -61 -18 -350 -21 -321 -3 -363 1 -363 31 0 7 8 20 18 28 32 30 72 81 72 93 0 7 9 21 20 31 11 10 31 55 45" +
		" 99 14 45 28 87 30 94 10 27 34 10 49 -36z";

	return (
		<SvgIcon
			viewBox='0 0 190.000000 188.000000'
			{...props}>
			<g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,188.000000) scale(0.115000,-0.115000)"
			   stroke="none">
				<path
					d={path}/>
			</g>
		</SvgIcon>
	)
}

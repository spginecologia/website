'use client';

/* * */

// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import { useEffect, useMemo } from 'react';

/* * */

export default function AppAuthenticationCheck({ children, permission = '', redirect = false, scope = '' }) {
	//

	return children;

	// const router = useRouter();
	// const { data: session, status } = useSession();

	// const hasPermission = useMemo(() => {
	// 	try {
	// 		return session?.user?.permissions[scope][permission] === true;
	// 	}
	// 	catch (err) {
	// 		return false;
	// 	}
	// }, [permission, scope, session?.user?.permissions]);

	// useEffect(() => {
	// 	if (status === 'authenticated') {
	// 		if (!hasPermission && redirect) router.push('/dashboard');
	// 	}
	// }, [hasPermission, redirect, router, status]);

	// //   return children;
	// if (hasPermission) return children;
	// else return <></>;

	//
}

export function isAllowed(session, scope, permission) {
	try {
		return session?.user?.permissions[scope][permission] === true;
	}
	catch (error) {
		return false;
	}
}

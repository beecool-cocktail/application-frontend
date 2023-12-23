import useAuthGuard from 'lib/application/useAuthGuard'

interface AuthGuardProps {
  children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const isAuthenticated = useAuthGuard()

  if (!isAuthenticated) {
    return null
  }
  return <>{children}</>
}

export default AuthGuard

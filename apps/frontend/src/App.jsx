import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.jsx'
import { Shield, AlertTriangle, CheckCircle, Activity, Users, FileText } from 'lucide-react'
import './App.css'

function App() {
  const [securityScore, setSecurityScore] = useState(85)
  const [activeAlerts, setActiveAlerts] = useState(3)
  const [complianceStatus, setComplianceStatus] = useState('89% (LGPD)')
  const [isLoading, setIsLoading] = useState(false)

  // Simular dados de alertas
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Bucket S3 Público Detectado',
      description: 'O bucket "dados-confidenciais" está configurado como público.',
      timestamp: '2 min atrás'
    },
    {
      id: 2,
      type: 'warning',
      title: 'MFA Não Configurado',
      description: 'Usuário IAM "dev-temp" não possui autenticação multifator ativada.',
      timestamp: '15 min atrás'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Security Group Permissivo',
      description: 'Security Group "default" permite tráfego SSH de qualquer IP.',
      timestamp: '1 hora atrás'
    }
  ]

  const runAudit = async () => {
    setIsLoading(true)
    // Simular chamada para API
    setTimeout(() => {
      setSecurityScore(Math.floor(Math.random() * 20) + 80)
      setIsLoading(false)
    }, 2000)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">CloudSec360</h1>
          </div>
          <p className="text-gray-600">Dashboard de Segurança Multi-Cloud</p>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Score de Segurança</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getScoreColor(securityScore)}`}>
                {securityScore}/100
              </div>
              <Progress value={securityScore} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {securityScore >= 90 ? 'Excelente' : securityScore >= 70 ? 'Bom' : 'Precisa melhorar'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${activeAlerts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {activeAlerts}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {activeAlerts === 0 ? 'Nenhum alerta ativo' : `${activeAlerts} alertas requerem atenção`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance LGPD</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{complianceStatus}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Última auditoria: hoje
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Execute auditorias e gere relatórios</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={runAudit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Activity className="mr-2 h-4 w-4 animate-spin" />
                    Executando...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Executar Auditoria
                  </>
                )}
              </Button>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Simular Incidente
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Alertas Recentes */}
        <Card>
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>Problemas de segurança detectados em sua infraestrutura</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className={alert.type === 'critical' ? 'border-red-200' : 'border-yellow-200'}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <AlertTitle className="text-sm font-medium">{alert.title}</AlertTitle>
                    <AlertDescription className="text-sm text-muted-foreground mt-1">
                      {alert.description}
                    </AlertDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={alert.type === 'critical' ? 'destructive' : 'secondary'}>
                        {alert.type === 'critical' ? 'Crítico' : 'Aviso'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              </Alert>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

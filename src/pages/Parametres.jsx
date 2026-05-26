import React, { useState } from 'react'
import { Settings, Eye, EyeOff, CheckCircle, AlertCircle, ExternalLink, Key, Info } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { checkServerHealth } from '../utils/apiClient.js'

export default function Parametres() {
  const { apiKey, saveApiKey } = useApp()
  const [keyInput, setKeyInput] = useState(apiKey || '')
  const [visible, setVisible] = useState(false)
  const [saved, setSaved] = useState(false)
  const [serverStatus, setServerStatus] = useState(null)
  const [checkingServer, setCheckingServer] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    saveApiKey(keyInput.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCheckServer = async () => {
    setCheckingServer(true)
    const ok = await checkServerHealth()
    setServerStatus(ok)
    setCheckingServer(false)
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-6 bg-red-500 rounded-full" />
          <h1 className="text-2xl font-black text-white tracking-tight">Paramètres</h1>
        </div>
        <p className="text-gray-500 text-sm ml-3">Configuration de ta clé API Claude</p>
      </div>

      {/* How it works */}
      <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info size={16} className="text-blue-400" />
          <h2 className="text-sm font-bold text-white">Comment ça fonctionne</h2>
        </div>
        <div className="space-y-2 text-xs text-gray-400 leading-relaxed">
          <p>
            MAESTRO utilise <span className="text-white font-semibold">Claude claude-opus-4-7</span> (le modèle le plus avancé d'Anthropic)
            pour analyser tes soumissions et générer des feedbacks éditoriaux de qualité professionnelle.
          </p>
          <p>
            Tu as besoin d'une <span className="text-white font-semibold">clé API Anthropic</span> pour utiliser ce service.
            Ta clé est stockée localement dans ton navigateur — elle n'est jamais envoyée à des serveurs tiers.
          </p>
          <p>
            Chaque analyse coûte environ <span className="text-amber-400 font-semibold">0.05 - 0.15 USD</span> selon la longueur du texte
            soumis (quelques centimes par analyse).
          </p>
        </div>
        <a
          href="https://console.anthropic.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          <ExternalLink size={12} />
          Obtenir une clé API sur console.anthropic.com
        </a>
      </div>

      {/* API Key form */}
      <form onSubmit={handleSave} className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Key size={16} className="text-red-400" />
          <h2 className="text-sm font-bold text-white">Clé API Claude</h2>
        </div>

        <div>
          <label className="field-label">Ta clé API Anthropic</label>
          <div className="relative">
            <input
              type={visible ? 'text' : 'password'}
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="input-field pr-10 font-mono"
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {keyInput && !keyInput.startsWith('sk-ant-') && (
            <p className="text-xs text-amber-400 mt-1 flex items-center gap-1">
              <AlertCircle size={11} />
              Le format attendu est "sk-ant-api03-..."
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="submit"
            className="btn-primary"
          >
            {saved ? (
              <>
                <CheckCircle size={16} className="text-green-400" />
                <span>Enregistré !</span>
              </>
            ) : (
              <>
                <Key size={16} />
                Enregistrer la clé
              </>
            )}
          </button>
          {apiKey && (
            <span className="text-xs text-green-400 flex items-center gap-1">
              <CheckCircle size={11} />
              Clé configurée
            </span>
          )}
        </div>
      </form>

      {/* Server check */}
      <div className="bg-[#111118] border border-[#1e1e2a] rounded-xl p-5">
        <h2 className="text-sm font-bold text-white mb-3">Diagnostic Serveur</h2>
        <p className="text-xs text-gray-500 mb-3 leading-relaxed">
          Vérifie que le serveur backend (port 3001) est bien en cours d'exécution.
          Lance-le avec <code className="bg-[#0a0a0f] px-1.5 py-0.5 rounded text-amber-400 font-mono">npm run dev</code> depuis le dossier du projet.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleCheckServer}
            disabled={checkingServer}
            className="btn-secondary disabled:opacity-50"
          >
            {checkingServer ? 'Vérification...' : 'Vérifier le serveur'}
          </button>
          {serverStatus === true && (
            <span className="text-xs text-green-400 flex items-center gap-1 font-bold">
              <CheckCircle size={12} />
              Serveur en ligne
            </span>
          )}
          {serverStatus === false && (
            <span className="text-xs text-red-400 flex items-center gap-1 font-bold">
              <AlertCircle size={12} />
              Serveur hors ligne
            </span>
          )}
        </div>
      </div>

      {/* Privacy note */}
      <div className="p-4 border border-[#1e1e2a] rounded-xl">
        <p className="text-xs text-gray-600 leading-relaxed">
          🔒 <span className="text-gray-500 font-medium">Confidentialité :</span>{' '}
          Ta clé API est stockée uniquement dans le localStorage de ton navigateur et envoyée directement
          au serveur local (port 3001) qui fait le relais vers l'API Anthropic. Aucune donnée n'est stockée
          sur des serveurs externes.
        </p>
      </div>
    </div>
  )
}
